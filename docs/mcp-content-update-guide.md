# MCP Content Update Guide

Use this when study text changes and existing user comments must remain attached.

## Current Persistence Model

- `content/source.md` is the only canonical source for parser, export, and MCP seed data.
- `docs/curriculum-coverage-map.md` is the Krok 3 coverage map. Read and update it whenever content is reorganized, added, or marked as a gap.
- `source_documents` stores Markdown source metadata and hashes.
- `themes` stores one visible reader section per row. `theme_key` is the stable identity; `title`, `slug`, and `sort_order` may change.
- `theme_content_blocks` stores commentable headings, paragraphs, and bullets. `block_key` is the stable identity used for upserts.
- `comments` stores user comments and points to either `themes.id` or `theme_content_blocks.id`.
- Routine content updates set old themes/blocks `is_active = false` instead of deleting them, so comments remain recoverable if a block is restored later.
- PDF files are not part of the machine data flow. The Krok 3 PDF is a blueprint/reference only; Supabase payloads are generated from Markdown.

## Krok 3 Source Structure

- Service sections come first: `Как пользоваться конспектом` and `Словарь аббревиатур`.
- Study content is intentionally hospital-stage focused: from patient arrival to the admitting/emergency department and through OR/ICU/ward/diagnostic-unit care. Prehospital triage, field sorting, evacuation logistics, and broad emergency-medicine workflows stay out of `content/source.md` unless the user explicitly asks for them.
- Krok modules are numbered in Markdown for review, but parser/export strips display numbers and keeps stable keys such as `theme-01`.
- Nested clinical headings must not keep legacy numbering such as `3.2.` or labels like `Перенесенный материал:`. Those prefixes are obsolete after restructuring and would be visible to readers.
- Krok code mapping belongs in `docs/curriculum-coverage-map.md`, not in `content/source.md`; do not add `Покрывает коды Крок 3` sections or raw Krok code lists to reader content.
- Every Krok module should keep these reader-facing frame headings: `Ключевые акценты`, `Практический алгоритм`, `Красные цифры/пороговые значения`, `Источники и спорные места`, `Пробелы к заполнению`.
- `Пробелы к заполнению` must be the last subsection of each Krok module so unfinished work stays visible without interrupting the study text.
- Avoid repeated "answer on the exam" or "oral answer" wording in `content/source.md`; Krok 3 is treated here as a written test, so use neutral phrases such as `Ключевые акценты`, `тестовые акценты`, or `клинический разбор`.
- Do not delete old material during restructuring. Move it into the closest Krok module; if it does not map cleanly, place it under a clearly marked preserved/rework subsection.
- New clinical doses, thresholds, and algorithms require a primary source in the coverage map. If verification is incomplete, mark the item as `Пробел` or `Требует сверки`.
- When adding historical orders, record their current legal/source status in `docs/curriculum-coverage-map.md`. For example, order `435/2006` on toxicology is useful study context but is no longer an active normative source, so reader content must say that before presenting it as a clinical basis.
- High-risk additions such as transfusion thresholds, LAST lipid rescue, malignant hyperthermia triggers, and drug contraindications should cite the primary guideline or official drug label in the coverage map before they are exported to Supabase.
- Do not put technical workflow notes in `content/source.md`. Keep MCP commands, revalidation URLs, cache policy, local source paths, and source inventories in docs only.

## Technical Notes Moved Out Of Source Content

- The Krok 3 blueprint file is `/Users/qinastha/Downloads/Програма_Крок_3_Анестезiологiя_та_iнтенсивна_терапiя.pdf`.
- Additional local clinical sources live in `/Users/qinastha/Downloads/Учеба/Анест`.
- The reader source inventory is maintained in `docs/curriculum-coverage-map.md`, not in `content/source.md`.
- Codex MCP should include a server named `supabase` for project ref `hkrpmyrpyevecfoalwlu`. Verify with `codex mcp list` before content pushes. The expected URL starts with `https://mcp.supabase.com/mcp?project_ref=hkrpmyrpyevecfoalwlu` and should include database/development features. The current configuration does not require a Bearer Token env var in the project repo.
- The deployed cache revalidation endpoint is `POST https://tmp-study-project.vercel.app/api/revalidate` with the `REVALIDATE_SECRET` value sent as `x-revalidate-secret`.
- The exported Supabase payload must keep `sourcePath: "content/source.md"` and must not contain PDF metadata.

## Runtime Cache Model

- Stable content is cached separately from comments.
- Themes and blocks use a long cache TTL: 24 hours.
- Comments also use a long cache TTL: 24 hours.
- Comments are cached per theme, not as arbitrary theme-id bundles.
- New comments created through the app invalidate only that theme's comment cache.
- Reader block queries must stay paginated with explicit ranges. Supabase REST returns only the first `1000` rows by default, and the current Markdown-derived content can exceed that after restructuring.
- MCP content updates must call the protected revalidation endpoint immediately after the Supabase upsert, because content cache is intentionally long-lived to reduce Supabase and Vercel usage.

## Rules For Preserving Comments

- Never recreate tables for content updates.
- Never update comments to point at a newly inserted block manually.
- Keep `theme_key` stable for a topic, even if the display title or slug changes.
- Keep `block_key` stable for a paragraph/heading/bullet when the same conceptual block is edited.
- If a block is deleted from the source, let the MCP upsert function mark it inactive. Do not hard-delete it unless you have confirmed it has no comments.
- If you must split one paragraph into two, keep the old `block_key` on the paragraph that best preserves the original comment context and create one new key for the new block.
- Keep source theme numbers in `content/source.md` when useful for review, but omit those numbers from Supabase display titles during export. Stable keys such as `theme-04` preserve the source numbering identity.

Exception: if the user explicitly approves a full structural reset and says old comments may be ignored, run a wipe/reseed flow for that one update. Document the reset in `docs/source-audit-YYYY-MM-DD.md`; after the reset, return to stable `theme_key`/`block_key` preservation for future comments.

## Update Workflow

1. Review `docs/curriculum-coverage-map.md` and current comments in Supabase.
2. Decide which content changes belong in `content/source.md`, and update the coverage map if Krok codes or source status change.
3. Update `content/source.md`; keep Markdown as the only source.
4. Verify and export Markdown-derived payload:

```bash
npm run source:verify
npm run content:export
```

5. In Supabase MCP, call the private maintenance function with the generated payload from `tmp/study-content-payload.json`:

```sql
select app_private.upsert_study_reader_content('<payload-json>'::jsonb);
```

If the current session cannot see Supabase MCP tools even though `codex mcp list` shows the `supabase` server, reconnect/refresh the Codex MCP session. Do not use the public publishable Supabase key for destructive reset/reseed work.

6. Immediately revalidate the deployed reader cache. The app caches stable themes/blocks for a day to avoid draining Supabase request limits, so MCP pushes must invalidate the cache explicitly:

```bash
curl -X POST "https://tmp-study-project.vercel.app/api/revalidate" \
  -H "x-revalidate-secret: $REVALIDATE_SECRET"
```

7. Verify counts and inactive rows:

```sql
select
  (select count(*) from public.themes where is_active) as active_themes,
  (select count(*) from public.theme_content_blocks where is_active) as active_blocks,
  (select count(*) from public.comments) as comments;
```

8. Run the local sanity suite:

```bash
npm run source:verify
npm run content:export
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
