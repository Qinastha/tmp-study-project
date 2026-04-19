alter table public.themes
  drop constraint if exists themes_source_document_id_sort_order_key;

create unique index if not exists themes_active_source_sort_idx
on public.themes(source_document_id, sort_order)
where is_active = true;

alter table public.theme_content_blocks
  drop constraint if exists content_blocks_theme_id_sort_order_key;

alter table public.theme_content_blocks
  drop constraint if exists theme_content_blocks_theme_id_sort_order_key;

create unique index if not exists theme_content_blocks_active_theme_sort_idx
on public.theme_content_blocks(theme_id, sort_order)
where is_active = true;

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
