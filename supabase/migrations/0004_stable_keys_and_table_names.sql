do $$
begin
  if to_regclass('public.theme_content_blocks') is null
     and to_regclass('public.content_blocks') is not null then
    alter table public.content_blocks rename to theme_content_blocks;
  end if;
end;
$$;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'comments'
      and column_name = 'content_block_id'
  ) then
    alter table public.comments rename column content_block_id to theme_content_block_id;
  end if;
end;
$$;

alter table public.themes
  add column if not exists theme_key text,
  add column if not exists is_active boolean not null default true;

alter table public.theme_content_blocks
  add column if not exists is_active boolean not null default true;

update public.themes
set theme_key = case
  when slug = 'kak-polzovatsya-konspektom' then 'guide'
  when slug = 'slovar-abbreviatur' then 'abbreviations'
  when slug = '1-normativnaya-karta-ekzamena' then 'theme-01'
  when slug ~ '^[0-9]+-' then 'theme-' || lpad(split_part(slug, '-', 1), 2, '0')
  else coalesce(theme_key, slug)
end
where theme_key is null;

alter table public.themes
  alter column theme_key set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'themes_theme_key_key'
      and conrelid = 'public.themes'::regclass
  ) then
    alter table public.themes add constraint themes_theme_key_key unique (theme_key);
  end if;
end;
$$;

do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conname = 'comments_block_matches_theme'
      and conrelid = 'public.comments'::regclass
  ) then
    alter table public.comments rename constraint comments_block_matches_theme
      to comments_theme_content_block_matches_theme;
  end if;
end;
$$;

drop policy if exists "Content blocks are public" on public.theme_content_blocks;
drop policy if exists "Theme content blocks are public" on public.theme_content_blocks;
create policy "Theme content blocks are public"
on public.theme_content_blocks for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Themes are public" on public.themes;
create policy "Themes are public"
on public.themes for select
to anon, authenticated
using (is_active = true);

drop index if exists public.content_blocks_theme_sort_idx;
create index if not exists theme_content_blocks_theme_sort_idx
on public.theme_content_blocks(theme_id, sort_order)
where is_active = true;

drop index if exists public.comments_block_created_idx;
create index if not exists comments_theme_content_block_created_idx
on public.comments(theme_content_block_id, created_at)
where theme_content_block_id is not null;

drop index if exists public.comments_theme_block_idx;
create index if not exists comments_theme_content_block_idx
on public.comments(theme_id, theme_content_block_id);

create schema if not exists app_private;
revoke all on schema app_private from public;
revoke all on schema app_private from anon, authenticated;

create or replace function app_private.upsert_study_reader_content(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, app_private
as $$
declare
  source_payload jsonb;
  theme_payload jsonb;
  block_payload jsonb;
  source_id uuid;
  current_theme_id uuid;
  incoming_theme_keys text[] := array[]::text[];
  incoming_block_keys text[] := array[]::text[];
  theme_count integer := 0;
  block_count integer := 0;
begin
  source_payload := payload -> 'sourceDocument';

  insert into public.source_documents (
    title,
    source_path,
    pdf_sha256,
    content_sha256,
    page_count,
    revision_date,
    metadata
  ) values (
    source_payload ->> 'title',
    source_payload ->> 'sourcePath',
    source_payload ->> 'pdfSha256',
    source_payload ->> 'contentSha256',
    nullif(source_payload ->> 'pageCount', '')::integer,
    nullif(source_payload ->> 'revisionDate', '')::date,
    coalesce(source_payload -> 'metadata', '{}'::jsonb)
  )
  on conflict (source_path) do update set
    title = excluded.title,
    pdf_sha256 = excluded.pdf_sha256,
    content_sha256 = excluded.content_sha256,
    page_count = excluded.page_count,
    revision_date = excluded.revision_date,
    metadata = excluded.metadata
  returning id into source_id;

  for theme_payload in select * from jsonb_array_elements(payload -> 'themes') loop
    incoming_theme_keys := incoming_theme_keys || (theme_payload ->> 'themeKey');

    insert into public.themes (
      source_document_id,
      theme_key,
      slug,
      title,
      sort_order,
      content_hash,
      is_active
    ) values (
      source_id,
      theme_payload ->> 'themeKey',
      theme_payload ->> 'slug',
      theme_payload ->> 'title',
      (theme_payload ->> 'sortOrder')::integer,
      theme_payload ->> 'contentHash',
      true
    )
    on conflict (theme_key) do update set
      source_document_id = excluded.source_document_id,
      slug = excluded.slug,
      title = excluded.title,
      sort_order = excluded.sort_order,
      content_hash = excluded.content_hash,
      is_active = true
    returning id into current_theme_id;

    theme_count := theme_count + 1;

    for block_payload in select * from jsonb_array_elements(theme_payload -> 'blocks') loop
      incoming_block_keys := incoming_block_keys || (block_payload ->> 'blockKey');

      insert into public.theme_content_blocks (
        theme_id,
        block_key,
        kind,
        heading_level,
        text,
        sort_order,
        content_hash,
        is_active
      ) values (
        current_theme_id,
        block_payload ->> 'blockKey',
        block_payload ->> 'kind',
        nullif(block_payload ->> 'headingLevel', '')::integer,
        block_payload ->> 'text',
        (block_payload ->> 'sortOrder')::integer,
        block_payload ->> 'contentHash',
        true
      )
      on conflict (block_key) do update set
        theme_id = excluded.theme_id,
        kind = excluded.kind,
        heading_level = excluded.heading_level,
        text = excluded.text,
        sort_order = excluded.sort_order,
        content_hash = excluded.content_hash,
        is_active = true;

      block_count := block_count + 1;
    end loop;
  end loop;

  update public.themes
  set is_active = false
  where source_document_id = source_id
    and not (theme_key = any(incoming_theme_keys));

  update public.theme_content_blocks
  set is_active = false
  where theme_id in (select id from public.themes where source_document_id = source_id)
    and not (block_key = any(incoming_block_keys));

  return jsonb_build_object('themes', theme_count, 'blocks', block_count);
end;
$$;

revoke all on function app_private.upsert_study_reader_content(jsonb) from public;
revoke all on function app_private.upsert_study_reader_content(jsonb) from anon, authenticated;

drop function if exists public.create_comment(uuid, uuid, text, text, text);
create or replace function public.create_comment(
  p_theme_id uuid,
  p_theme_content_block_id uuid,
  p_target_type text,
  p_author_name text,
  p_body text
)
returns public.comments
language plpgsql
security definer
set search_path = public
as $$
declare
  cleaned_author text := btrim(p_author_name);
  cleaned_body text := btrim(p_body);
  inserted_comment public.comments;
begin
  if p_target_type not in ('theme', 'block') then
    raise exception 'Invalid comment target.' using errcode = '22023';
  end if;

  if char_length(cleaned_author) < 2 or char_length(cleaned_author) > 80 then
    raise exception 'Author name must be between 2 and 80 characters.' using errcode = '22023';
  end if;

  if char_length(cleaned_body) < 2 or char_length(cleaned_body) > 2000 then
    raise exception 'Comment body must be between 2 and 2000 characters.' using errcode = '22023';
  end if;

  if not exists (select 1 from public.themes where id = p_theme_id and is_active = true) then
    raise exception 'Theme not found.' using errcode = '22023';
  end if;

  if p_target_type = 'theme' and p_theme_content_block_id is not null then
    raise exception 'Theme comments cannot include a block id.' using errcode = '22023';
  end if;

  if p_target_type = 'block' then
    if p_theme_content_block_id is null then
      raise exception 'Block comments require a block id.' using errcode = '22023';
    end if;

    if not exists (
      select 1
      from public.theme_content_blocks
      where id = p_theme_content_block_id
        and theme_id = p_theme_id
        and is_active = true
    ) then
      raise exception 'Block not found in theme.' using errcode = '22023';
    end if;
  end if;

  insert into public.comments (
    theme_id,
    theme_content_block_id,
    target_type,
    author_name,
    body
  ) values (
    p_theme_id,
    p_theme_content_block_id,
    p_target_type,
    cleaned_author,
    cleaned_body
  )
  returning * into inserted_comment;

  return inserted_comment;
end;
$$;

revoke all on function public.create_comment(uuid, uuid, text, text, text) from public;
grant execute on function public.create_comment(uuid, uuid, text, text, text) to anon, authenticated;
