create extension if not exists "pgcrypto";

create table if not exists public.source_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 240),
  source_path text not null unique,
  pdf_sha256 text not null check (char_length(pdf_sha256) = 64),
  content_sha256 text not null check (char_length(content_sha256) = 64),
  page_count integer check (page_count is null or page_count > 0),
  revision_date date,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.themes (
  id uuid primary key default gen_random_uuid(),
  source_document_id uuid not null references public.source_documents(id) on delete cascade,
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]*$'),
  title text not null check (char_length(title) between 1 and 320),
  sort_order integer not null check (sort_order > 0),
  content_hash text not null check (char_length(content_hash) = 64),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_document_id, sort_order)
);

create table if not exists public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  theme_id uuid not null references public.themes(id) on delete cascade,
  block_key text not null unique check (block_key ~ '^[a-z0-9][a-z0-9-]*-[0-9]{3}$'),
  kind text not null check (kind in ('heading', 'paragraph', 'bullet')),
  heading_level integer check (heading_level is null or heading_level between 2 and 4),
  text text not null check (char_length(btrim(text)) > 0),
  sort_order integer not null check (sort_order > 0),
  content_hash text not null check (char_length(content_hash) = 64),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (theme_id, id),
  unique (theme_id, sort_order)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  theme_id uuid not null references public.themes(id) on delete cascade,
  content_block_id uuid,
  target_type text not null check (target_type in ('theme', 'block')),
  author_name text not null check (char_length(btrim(author_name)) between 2 and 80),
  body text not null check (char_length(btrim(body)) between 2 and 2000),
  status text not null default 'visible' check (status in ('visible', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint comments_target_shape check (
    (target_type = 'theme' and content_block_id is null)
    or
    (target_type = 'block' and content_block_id is not null)
  ),
  constraint comments_block_matches_theme foreign key (theme_id, content_block_id)
    references public.content_blocks(theme_id, id)
    on delete cascade
);

create index if not exists themes_sort_order_idx on public.themes(sort_order);
create index if not exists content_blocks_theme_sort_idx on public.content_blocks(theme_id, sort_order);
create index if not exists comments_theme_created_idx on public.comments(theme_id, created_at);
create index if not exists comments_block_created_idx on public.comments(content_block_id, created_at)
  where content_block_id is not null;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_source_documents_updated_at on public.source_documents;
create trigger set_source_documents_updated_at
before update on public.source_documents
for each row execute function public.set_updated_at();

drop trigger if exists set_themes_updated_at on public.themes;
create trigger set_themes_updated_at
before update on public.themes
for each row execute function public.set_updated_at();

drop trigger if exists set_content_blocks_updated_at on public.content_blocks;
create trigger set_content_blocks_updated_at
before update on public.content_blocks
for each row execute function public.set_updated_at();

drop trigger if exists set_comments_updated_at on public.comments;
create trigger set_comments_updated_at
before update on public.comments
for each row execute function public.set_updated_at();

alter table public.source_documents enable row level security;
alter table public.themes enable row level security;
alter table public.content_blocks enable row level security;
alter table public.comments enable row level security;

drop policy if exists "Source documents are public" on public.source_documents;
create policy "Source documents are public"
on public.source_documents for select
to anon, authenticated
using (true);

drop policy if exists "Themes are public" on public.themes;
create policy "Themes are public"
on public.themes for select
to anon, authenticated
using (true);

drop policy if exists "Content blocks are public" on public.content_blocks;
create policy "Content blocks are public"
on public.content_blocks for select
to anon, authenticated
using (true);

drop policy if exists "Visible comments are public" on public.comments;
create policy "Visible comments are public"
on public.comments for select
to anon, authenticated
using (status = 'visible');

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
    and not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'comments'
    )
  then
    alter publication supabase_realtime add table public.comments;
  end if;
end;
$$;
