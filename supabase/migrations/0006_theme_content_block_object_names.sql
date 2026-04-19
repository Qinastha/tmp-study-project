do $$
begin
  if exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'content_blocks_pkey'
  ) and not exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'theme_content_blocks_pkey'
  ) then
    alter table public.theme_content_blocks
      rename constraint content_blocks_pkey to theme_content_blocks_pkey;
  end if;

  if exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'content_blocks_theme_id_fkey'
  ) and not exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'theme_content_blocks_theme_id_fkey'
  ) then
    alter table public.theme_content_blocks
      rename constraint content_blocks_theme_id_fkey to theme_content_blocks_theme_id_fkey;
  end if;

  if exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'content_blocks_block_key_key'
  ) and not exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'theme_content_blocks_block_key_key'
  ) then
    alter table public.theme_content_blocks
      rename constraint content_blocks_block_key_key to theme_content_blocks_block_key_key;
  end if;

  if exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'content_blocks_theme_id_id_key'
  ) and not exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'theme_content_blocks_theme_id_id_key'
  ) then
    alter table public.theme_content_blocks
      rename constraint content_blocks_theme_id_id_key to theme_content_blocks_theme_id_id_key;
  end if;

  if exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'content_blocks_block_key_check'
  ) and not exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'theme_content_blocks_block_key_check'
  ) then
    alter table public.theme_content_blocks
      rename constraint content_blocks_block_key_check to theme_content_blocks_block_key_check;
  end if;

  if exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'content_blocks_content_hash_check'
  ) and not exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'theme_content_blocks_content_hash_check'
  ) then
    alter table public.theme_content_blocks
      rename constraint content_blocks_content_hash_check to theme_content_blocks_content_hash_check;
  end if;

  if exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'content_blocks_heading_level_check'
  ) and not exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'theme_content_blocks_heading_level_check'
  ) then
    alter table public.theme_content_blocks
      rename constraint content_blocks_heading_level_check to theme_content_blocks_heading_level_check;
  end if;

  if exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'content_blocks_kind_check'
  ) and not exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'theme_content_blocks_kind_check'
  ) then
    alter table public.theme_content_blocks
      rename constraint content_blocks_kind_check to theme_content_blocks_kind_check;
  end if;

  if exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'content_blocks_sort_order_check'
  ) and not exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'theme_content_blocks_sort_order_check'
  ) then
    alter table public.theme_content_blocks
      rename constraint content_blocks_sort_order_check to theme_content_blocks_sort_order_check;
  end if;

  if exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'content_blocks_text_check'
  ) and not exists (
    select 1 from pg_constraint
    where conrelid = 'public.theme_content_blocks'::regclass and conname = 'theme_content_blocks_text_check'
  ) then
    alter table public.theme_content_blocks
      rename constraint content_blocks_text_check to theme_content_blocks_text_check;
  end if;

  if exists (
    select 1 from pg_trigger
    where tgrelid = 'public.theme_content_blocks'::regclass and tgname = 'set_content_blocks_updated_at'
  ) and not exists (
    select 1 from pg_trigger
    where tgrelid = 'public.theme_content_blocks'::regclass and tgname = 'set_theme_content_blocks_updated_at'
  ) then
    alter trigger set_content_blocks_updated_at on public.theme_content_blocks
      rename to set_theme_content_blocks_updated_at;
  end if;
end $$;
