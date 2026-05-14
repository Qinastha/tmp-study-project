# Source Audit 2026-05-14

## Supabase Full Reset / Reseed

- Date: 2026-05-14.
- Reason: user explicitly approved deleting existing Supabase reader content because there were no comments to preserve.
- Source of truth: `content/source.md`.
- Local verification before push: `npm run source:verify` and `npm run content:export`.
- Export payload: `tmp/study-content-payload.json`.
- Source path in Supabase: `content/source.md`.
- Expected export counts: `27` themes and `2428` content blocks.
- MCP action: `truncate public.comments, public.theme_content_blocks, public.themes, public.source_documents restart identity cascade`, then `app_private.upsert_study_reader_content(payload)`.
- Upsert result: `27` themes and `2428` content blocks.
- Live verification after push: `source_documents = 1`, active `themes = 27`, active `theme_content_blocks = 2428`, `comments = 0`.
- Markdown-only schema verification: no `pdf_sha256` or `page_count` columns; `source_sha256` is present.
- Reader hygiene verification: no numeric title prefixes, no `Покрывает коды Крок 3` blocks, no Markdown separator rows in active content.
- Cache action: called `POST https://tmp-study-project.vercel.app/api/revalidate` with `x-revalidate-secret`; response `{"ok":true}`.

Future updates should return to stable `theme_key` / `block_key` preservation unless the user again explicitly approves a full reset.
