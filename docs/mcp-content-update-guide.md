# MCP Content Update Guide

Use this when study text changes and existing user comments must remain attached.

## Current Persistence Model

- `source_documents` stores the source PDF/Markdown metadata and hashes.
- `themes` stores one visible reader section per row. `theme_key` is the stable identity; `title`, `slug`, and `sort_order` may change.
- `theme_content_blocks` stores commentable headings, paragraphs, and bullets. `block_key` is the stable identity used for upserts.
- `comments` stores user comments and points to either `themes.id` or `theme_content_blocks.id`.
- Routine content updates set old themes/blocks `is_active = false` instead of deleting them, so comments remain recoverable if a block is restored later.

## Rules For Preserving Comments

- Never recreate tables for content updates.
- Never update comments to point at a newly inserted block manually.
- Keep `theme_key` stable for a topic, even if the display title or slug changes.
- Keep `block_key` stable for a paragraph/heading/bullet when the same conceptual block is edited.
- If a block is deleted from the source, let the MCP upsert function mark it inactive. Do not hard-delete it unless you have confirmed it has no comments.
- If you must split one paragraph into two, keep the old `block_key` on the paragraph that best preserves the original comment context and create one new key for the new block.

## Update Workflow

1. Update the Markdown/PDF source outside the app.
2. Run:

```bash
npm run source:verify
npm run content:export
```

3. In Supabase MCP, call the private maintenance function with the generated payload from `tmp/study-content-payload.json`:

```sql
select app_private.upsert_study_reader_content('<payload-json>'::jsonb);
```

4. Verify counts and inactive rows:

```sql
select
  (select count(*) from public.themes where is_active) as active_themes,
  (select count(*) from public.theme_content_blocks where is_active) as active_blocks,
  (select count(*) from public.comments) as comments;
```

5. Run the local sanity suite:

```bash
npm run test
npm run lint
npm run build
E2E_SUPABASE_READY=1 npm run test:e2e
```

## Hard Delete Policy

Hard-delete inactive rows only when all of these are true:

- the product decision is to permanently remove that section/block;
- there are no comments attached to it;
- the next app release no longer links to its slug/block key.

Safe check:

```sql
select b.block_key, count(c.id) as comments
from public.theme_content_blocks b
left join public.comments c on c.theme_content_block_id = b.id
where b.is_active = false
group by b.block_key
order by comments desc, b.block_key;
```
