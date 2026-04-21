import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ReaderView } from "../src/components/reader/reader-view";
import { ThemeProvider } from "../src/components/theme/theme-provider";
import { TooltipProvider } from "../src/components/ui/tooltip";
import type { ReaderTheme } from "../src/lib/content/repository";
import type { ContentBlockRow } from "../src/types/database";

const now = "2026-04-21T12:00:00.000Z";
const themeId = "11111111-1111-4111-8111-111111111111";

function block(overrides: Partial<ContentBlockRow>): ContentBlockRow {
  return {
    id: "22222222-2222-4222-8222-222222222222",
    theme_id: themeId,
    block_key: "theme-20-001",
    kind: "bullet",
    heading_level: null,
    text: "",
    sort_order: 1,
    content_hash: "hash",
    is_active: true,
    created_at: now,
    updated_at: now,
    ...overrides,
  };
}

function readerTheme(blocks: ContentBlockRow[]): ReaderTheme {
  return {
    id: themeId,
    source_document_id: "33333333-3333-4333-8333-333333333333",
    theme_key: "theme-20",
    slug: "toxicology",
    title: "Токсикология и острые отравления",
    sort_order: 20,
    content_hash: "hash",
    is_active: true,
    created_at: now,
    updated_at: now,
    blocks,
    comments: [],
  };
}

describe("ReaderView Markdown tables", () => {
  it("renders consecutive pipe-delimited bullet blocks as a responsive table", () => {
    const html = renderToStaticMarkup(
      <ThemeProvider>
        <TooltipProvider>
          <ReaderView
            mode="all"
            themes={[
              readerTheme([
                block({
                  id: "22222222-2222-4222-8222-222222222221",
                  block_key: "theme-20-101",
                  text: "Позиции из приказа МОЗ №435: препарат | где упоминается | доза/схема в приказе | комментарий для конспекта.",
                  sort_order: 101,
                }),
                block({
                  id: "22222222-2222-4222-8222-222222222222",
                  block_key: "theme-20-102",
                  text: "`Налоксон` | отравление опиоидами | `0,4-2,0 мг` | сначала обеспечить вентиляцию и кислород.",
                  sort_order: 102,
                }),
              ]),
            ]}
          />
        </TooltipProvider>
      </ThemeProvider>,
    );

    expect(html).toContain('role="table"');
    expect(html).toContain('data-reader-markdown-table="true"');
    expect(html).toContain('role="columnheader"');
    expect(html).toContain('role="cell"');
    expect(html).toContain("Налоксон");
    expect(html).toContain("overflow-x-auto");
    expect(html).toContain("theme-20-102");
  });
});
