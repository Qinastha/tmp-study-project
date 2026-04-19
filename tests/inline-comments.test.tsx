import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { InlineComments, pluralizeComment } from "../src/components/reader/inline-comments";
import type { CommentRow } from "../src/types/database";

const baseComment: CommentRow = {
  id: "11111111-1111-4111-8111-111111111111",
  theme_id: "22222222-2222-4222-8222-222222222222",
  theme_content_block_id: "33333333-3333-4333-8333-333333333333",
  target_type: "block",
  author_name: "Олена",
  body: "Проверочное замечание рядом с абзацем.",
  status: "visible",
  created_at: "2026-04-19T12:00:00.000Z",
  updated_at: "2026-04-19T12:00:00.000Z",
};

function comment(overrides: Partial<CommentRow>): CommentRow {
  return { ...baseComment, ...overrides };
}

describe("InlineComments", () => {
  it("renders the first two visible comments and a show-all affordance", () => {
    const html = renderToStaticMarkup(
      <InlineComments
        comments={[
          comment({ id: "11111111-1111-4111-8111-111111111111", author_name: "Олена", body: "Первый комментарий." }),
          comment({ id: "22222222-2222-4222-8222-222222222222", author_name: "Максим", body: "Второй комментарий." }),
          comment({ id: "33333333-3333-4333-8333-333333333333", author_name: "Ірина", body: "Третий комментарий." }),
        ]}
        onShowAll={() => undefined}
      />,
    );

    expect(html).toContain("3 комментария");
    expect(html).toContain("Первый комментарий.");
    expect(html).toContain("Второй комментарий.");
    expect(html).not.toContain("Третий комментарий.");
    expect(html).toContain("Показать все: 3");
  });

  it("does not render an empty comment rail", () => {
    const html = renderToStaticMarkup(<InlineComments comments={[]} onShowAll={() => undefined} />);

    expect(html).toBe("");
  });

  it("uses Russian comment plurals", () => {
    expect(pluralizeComment(1)).toBe("комментарий");
    expect(pluralizeComment(3)).toBe("комментария");
    expect(pluralizeComment(11)).toBe("комментариев");
    expect(pluralizeComment(25)).toBe("комментариев");
  });
});
