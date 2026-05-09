# Source Audit - 2026-05-09

This document records the Supabase reset/reseed for the current `content/source.md`. It is technical project documentation; do not copy it into the reader source.

## Scope

- Canonical content source: `content/source.md`.
- Data flow: Markdown-only export through Supabase MCP.
- User explicitly approved deleting the existing comment and old reader data for a clean full reseed.
- The source remains hospital-stage focused and uses the source-priority rules in `AGENTS.md`.

## Local Verification Before Push

- `npm run source:verify` passed.
- `npm run content:export` produced `tmp/study-content-payload.json`.
- `npm run test` passed: `60` tests.
- Exported payload:
  - source path: `content/source.md`;
  - source SHA-256: `84c577c42212fc3e010a8a5c0220b8dfa95564aa549c6f338d333dbcc8dc6beb`;
  - content SHA-256: `dc08672e123ba6958823b66b61c5a219c80287a7057adf3792c7ed21aec85f77`;
  - themes: `27`;
  - blocks: `2298`;
  - Markdown separator rows exported as content: `0`;
  - pipe-delimited bullet rows for responsive table rendering: `336`.

## Supabase Reset/Reseed Log

Completed on `2026-05-09` through the configured Supabase MCP server for project `hkrpmyrpyevecfoalwlu`.

- MCP availability was confirmed with `codex mcp list`; the server was enabled with database/development features.
- Pre-reset live state: `1` source document, `27` active themes, `2152` active blocks, `1` comment.
- Reset action: truncated `comments`, `theme_content_blocks`, `themes`, and `source_documents`.
- Reseed action: called `app_private.upsert_study_reader_content(payload jsonb)` with the Markdown export payload.
- MCP reseed result: `27` themes, `2298` blocks.
- Post-reseed live verification:
  - `source_documents = 1`;
  - `source_path = content/source.md`;
  - `active_themes = 27`;
  - `active_blocks = 2298`;
  - `comments = 0`;
  - `pdf_sha256/page_count` columns present: `0`;
  - active Markdown separator rows: `0`;
  - active pipe-delimited bullet rows: `336`.
- Protected Vercel cache revalidation returned `{"ok":true}` from `POST https://tmp-study-project.vercel.app/api/revalidate`.
- `E2E_SUPABASE_READY=1 npm run test:e2e` passed after reseed: `29` passed, `1` skipped.
- A final comment-count check after E2E still returned `0`.

## Follow-Up Rule

After this reset, return to the normal preservation workflow in `docs/mcp-content-update-guide.md`: preserve stable `theme_key` and `block_key` values where possible, prefer upsert/deactivate over hard deletion, and only run a future wipe/reseed after explicit user approval.
