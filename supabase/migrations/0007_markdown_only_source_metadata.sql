do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'source_documents'
      and column_name = 'pdf_sha256'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'source_documents'
      and column_name = 'source_sha256'
  ) then
    alter table public.source_documents
      rename column pdf_sha256 to source_sha256;
  end if;

  if exists (
    select 1
    from pg_constraint
    where conrelid = 'public.source_documents'::regclass
      and conname = 'source_documents_pdf_sha256_check'
  ) and not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.source_documents'::regclass
      and conname = 'source_documents_source_sha256_check'
  ) then
    alter table public.source_documents
      rename constraint source_documents_pdf_sha256_check to source_documents_source_sha256_check;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'source_documents'
      and column_name = 'page_count'
  ) then
    alter table public.source_documents
      drop column page_count;
  end if;
end $$;

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
    source_sha256,
    content_sha256,
    revision_date,
    metadata
  ) values (
    source_payload ->> 'title',
    source_payload ->> 'sourcePath',
    source_payload ->> 'sourceSha256',
    source_payload ->> 'contentSha256',
    nullif(source_payload ->> 'revisionDate', '')::date,
    coalesce(source_payload -> 'metadata', '{}'::jsonb)
  )
  on conflict (source_path) do update set
    title = excluded.title,
    source_sha256 = excluded.source_sha256,
    content_sha256 = excluded.content_sha256,
    revision_date = excluded.revision_date,
    metadata = excluded.metadata
  returning id into source_id;

  update public.themes
  set is_active = false
  where source_document_id = source_id;

  update public.theme_content_blocks
  set is_active = false
  where theme_id in (select id from public.themes where source_document_id = source_id);

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

  return jsonb_build_object('themes', theme_count, 'blocks', block_count);
end;
$$;

revoke all on function app_private.upsert_study_reader_content(jsonb) from public;
revoke all on function app_private.upsert_study_reader_content(jsonb) from anon, authenticated;
