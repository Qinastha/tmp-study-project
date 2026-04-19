import fs from "node:fs";
import { describe, expect, it } from "vitest";

import { parseStudyMarkdown } from "../src/lib/content/parser";
import { SOURCE_MARKDOWN_PATH } from "../src/lib/content/paths";

describe("parseStudyMarkdown", () => {
  const parsed = parseStudyMarkdown(fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8"));

  it("creates website sections without the unused normative map", () => {
    expect(parsed.themes).toHaveLength(19);
    expect(parsed.themes.filter((theme) => theme.themeKey.startsWith("theme-"))).toHaveLength(17);
    expect(parsed.themes[0].title).toBe("Как пользоваться конспектом");
    expect(parsed.themes.some((theme) => theme.title.includes("Нормативная карта экзамена"))).toBe(false);
    expect(parsed.themes[18].title).toBe("Источниковая база");
  });

  it("removes source numbers from theme display titles", () => {
    expect(parsed.themes.map((theme) => theme.title)).not.toContain("4. Нутритивная поддержка");
    expect(parsed.themes.find((theme) => theme.themeKey === "theme-04")?.title).toBe(
      "Нутритивная поддержка",
    );
    expect(parsed.themes.every((theme) => !/^\d+\./.test(theme.title))).toBe(true);
  });

  it("preserves stable ordering and block keys", () => {
    const cprTheme = parsed.themes.find((theme) => theme.themeKey === "theme-02");

    expect(cprTheme?.sortOrder).toBe(3);
    expect(cprTheme?.blocks[0].blockKey).toBe("theme-02-001");
    expect(cprTheme?.blocks[0].kind).toBe("heading");
  });

  it("uses website-specific guide copy", () => {
    const guide = parsed.themes[0];

    expect(guide.themeKey).toBe("guide");
    expect(guide.blocks.map((block) => block.text)).toEqual([
      "Этот сайт заменяет простой PDF: темы читаются по одной или одним длинным списком, а комментарии привязаны к конкретной теме или абзацу.",
      "В режиме одной темы используйте навигацию назад/далее, чтобы идти по материалу без отвлечений.",
      "В режиме всех тем удобно быстро повторять материал подряд и видеть те же комментарии возле соответствующих абзацев.",
      "Значок комментария возле блока показывает, что к этому месту уже есть заметки; на компьютере короткие комментарии видны рядом с текстом, на телефоне - под блоком.",
      "Комментарии общие для всех читателей: оставляйте уточнения, вопросы и клинические акценты так, чтобы они помогали следующему человеку.",
    ]);
  });

  it("hashes each theme and block", () => {
    expect(parsed.contentHash).toMatch(/^[a-f0-9]{64}$/);
    for (const theme of parsed.themes) {
      expect(theme.contentHash).toMatch(/^[a-f0-9]{64}$/);
      for (const block of theme.blocks) {
        expect(block.contentHash).toMatch(/^[a-f0-9]{64}$/);
      }
    }
  });
});
