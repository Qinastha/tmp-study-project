# АИТ Study Reader

Next.js + Tailwind + shadcn/ui reader for the АИТ exam notes. The app reads structured themes and paragraph blocks from Supabase and supports shared comments on a whole theme or an exact paragraph/block.

## Local Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000/themes.

## Supabase

`.env.local` contains the public Supabase URL/key from the prompt. Runtime comments use the database-owned `create_comment` RPC, so Vercel does not need a service-role key.

Schema and content are managed through Supabase MCP.

The canonical source is `content/source.md`. Supabase content is exported from this Markdown file only.
PDF files are not part of the update flow.

```bash
npm run source:verify
npm run content:export
```

Then use MCP to call `app_private.upsert_study_reader_content` with `tmp/study-content-payload.json`.
See [docs/mcp-content-update-guide.md](docs/mcp-content-update-guide.md) for the safe persistence workflow.

## Verification

```bash
npm run source:verify
npm run test
npm run lint
npm run build
npm run test:e2e
```

The seeded-reader Playwright test is skipped until `E2E_SUPABASE_READY=1` is set against a migrated and seeded project.

## Vercel Env

Set these in Vercel Project Settings:

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
REVALIDATE_SECRET
```

No service-role key is needed for normal Vercel runtime.

Reader themes and blocks are cached to avoid repeated Supabase reads during normal study sessions.
Comments are also cached per theme for 24 hours, and comment writes invalidate only the touched theme.
After MCP content updates, immediately call `POST https://tmp-study-project.vercel.app/api/revalidate` with `x-revalidate-secret: <REVALIDATE_SECRET>` so Vercel serves the new Markdown-derived content immediately.
