import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ReaderView } from "../src/components/reader/reader-view";
import { ThemeProvider } from "../src/components/theme/theme-provider";
import { TooltipProvider } from "../src/components/ui/tooltip";
import type { ReaderTheme } from "../src/lib/content/repository";

const now = "2026-04-26T12:00:00.000Z";

function theme(index: number, slug: string, title: string): ReaderTheme {
  return {
    id: `theme-${index}`,
    source_document_id: "source-document",
    theme_key: `theme-${String(index).padStart(2, "0")}`,
    slug,
    title,
    sort_order: index,
    content_hash: `hash-${index}`,
    is_active: true,
    created_at: now,
    updated_at: now,
    blocks: [
      {
        id: `block-${index}`,
        theme_id: `theme-${index}`,
        block_key: `theme-${String(index).padStart(2, "0")}-001`,
        kind: "paragraph",
        heading_level: null,
        text: `Короткий учебный блок ${index}.`,
        sort_order: 1,
        content_hash: `block-hash-${index}`,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
    ],
    comments: [],
  };
}

function renderReader(mode: "all" | "single") {
  return renderToStaticMarkup(
    <ThemeProvider>
      <TooltipProvider>
        <ReaderView
          mode={mode}
          selectedSlug={mode === "single" ? "airway" : undefined}
          themes={[
            theme(1, "preop", "Передоперационная оценка"),
            theme(2, "airway", "Дыхательные пути и ИВЛ"),
            theme(3, "tox", "Токсикология"),
          ]}
        />
      </TooltipProvider>
    </ThemeProvider>,
  );
}

describe("ReaderView layout", () => {
  it("renders stable all-themes anchors and theme markers in server HTML", () => {
    const html = renderReader("all");

    expect(html).toContain('data-reader-theme="airway"');
    expect(html).toContain('data-reader-theme-nav="expanded"');
    expect(html).toContain('aria-label="Свернуть список тем"');
    expect(html).toContain('href="#airway"');
    expect(html).not.toContain('data-testid="all-themes-floating-nav"');
  });

  it("keeps single-theme navigation routed to dedicated theme pages", () => {
    const html = renderReader("single");

    expect(html).not.toContain('data-testid="all-themes-floating-nav"');
    expect(html).toContain('href="/themes/preop"');
    expect(html).toContain('href="/themes/tox"');
    expect(html).toContain('aria-label="Вернуться ко всем темам"');
    expect(html).toContain("Одна тема");
  });
});
