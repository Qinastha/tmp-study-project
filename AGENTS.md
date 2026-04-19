<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Study Content Updates

Before changing study content, parser behavior, or Supabase/MCP update flow, read `docs/mcp-content-update-guide.md`.

The canonical source is `content/source.md`. Export and push Supabase content from Markdown only; PDF files are not part of the data flow.

After MCP content pushes, call the protected `/api/revalidate` endpoint described in the guide so Vercel does not serve stale long-TTL content.
