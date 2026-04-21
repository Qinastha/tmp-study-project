<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Study Content Updates

Before changing study content, parser behavior, or Supabase/MCP update flow, read `docs/mcp-content-update-guide.md` and `docs/curriculum-coverage-map.md`.

The canonical source is `content/source.md`. Export and push Supabase content from Markdown only; PDF files are reference/blueprint artifacts and are not part of the data flow.

The study content scope is the hospital stage of anesthesia and intensive care, starting when the patient reaches the admitting/emergency department, operating room, ICU, ward, diagnostic unit, or transfer point inside the health-care facility. Do not spend source.md space on prehospital triage, field sorting, evacuation logistics, or broad emergency-medicine topics unless the user explicitly asks; if a Krok code mentions them, mark the prehospital part as out of current scope and keep the AIT-facing hospital workflow.

Krok 3 restructuring must preserve existing clinical material unless the user explicitly approves deletion. Move material to the closest Krok module, keep gaps marked as `Пробел`/`Требует сверки`, and cite the source priority in the coverage map before adding new clinical numbers.

Clinical content source priority is fixed unless the user explicitly changes it:
1. Current/active МОЗ/ДЭЦ orders, standards, and unified clinical protocols are the first source for clinical rules, doses, thresholds, contraindications, and algorithms.
2. If МОЗ/ДЭЦ does not cover the question, use Шлапак (`Анестезіологія та інтенсивна терапія`, volumes 1-2) as the second-priority explanatory textbook source.
3. If neither МОЗ/ДЭЦ nor Шлапак covers the point, use a narrow trusted source: local ООКБ protocol, professional-society guideline, international guideline, regulator label, or peer-reviewed consensus. Clearly name that source in the reader content and `docs/curriculum-coverage-map.md`.

Do not add clinical doses, thresholds, or contraindications as final facts unless the source is known and current enough. If verification is incomplete, mark the item as `Пробел`/`Требует сверки` instead of smoothing over uncertainty.

Keep technical workflow details out of `content/source.md`. MCP commands, revalidation URLs, cache policy, local source paths, and source inventories belong in documentation, especially `docs/mcp-content-update-guide.md` and `docs/curriculum-coverage-map.md`.

Only top-level Krok reader modules in `content/source.md` should carry review numbers. Nested clinical headings must be clean reader-facing titles without legacy prefixes such as `3.2.` or `Перенесенный материал:`.

After MCP content pushes, call the protected `/api/revalidate` endpoint described in the guide so Vercel does not serve stale long-TTL content.

Supabase MCP is expected to be configured in Codex as server `supabase` for project `hkrpmyrpyevecfoalwlu`. Before a database update, run `codex mcp list` and confirm the `supabase` entry points to `https://mcp.supabase.com/mcp?project_ref=hkrpmyrpyevecfoalwlu...` with database/development features enabled. If MCP tools are not visible in the current session, ask the user to refresh/reconnect the Codex MCP session instead of falling back to unsafe public-key writes.

For Supabase implementation guidance, first read the local agent skills installed in this repo: `.agents/skills/supabase/SKILL.md` for product, auth, SSR, MCP, RLS, storage, realtime, and migration workflow rules, and `.agents/skills/supabase-postgres-best-practices/SKILL.md` for Postgres schema/query/RLS/performance details. Because Supabase changes frequently, verify technical details against official docs with the Supabase MCP `search_docs` tool before changing database schema, RLS policies, SSR clients, realtime subscriptions, edge functions, or content push procedures. Use Supabase MCP project tools such as `list_tables`, `list_migrations`, `get_advisors`, `get_logs`, and `execute_sql`/maintenance RPC checks for live project state; do not infer live schema from code alone.
