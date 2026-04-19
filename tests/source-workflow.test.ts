import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import packageJson from "../package.json";
import { parseStudyMarkdown } from "../src/lib/content/parser";
import { SOURCE_MARKDOWN_PATH, SOURCE_MARKDOWN_RELATIVE_PATH } from "../src/lib/content/paths";

describe("source workflow", () => {
  it("uses Markdown as the only machine source", () => {
    expect(path.relative(process.cwd(), SOURCE_MARKDOWN_PATH)).toBe("content/source.md");
    expect(SOURCE_MARKDOWN_RELATIVE_PATH).toBe("content/source.md");
    expect("source:pdf" in packageJson.scripts).toBe(false);
    expect(fs.existsSync("public/source.pdf")).toBe(false);
  });

  it("keeps source.md aligned with the current reader content", () => {
    expect(fs.existsSync(SOURCE_MARKDOWN_PATH)).toBe(true);

    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const parsed = parseStudyMarkdown(markdown);
    const guide = parsed.themes[0];

    expect(markdown).not.toContain("Нормативная карта экзамена");
    expect(guide.blocks.map((block) => block.text)).toEqual([
      "Этот сайт заменяет простой PDF: темы читаются по одной или одним длинным списком, а комментарии привязаны к конкретной теме или абзацу.",
      "В режиме одной темы используйте навигацию назад/далее, чтобы идти по материалу без отвлечений.",
      "В режиме всех тем удобно быстро повторять материал подряд и видеть те же комментарии возле соответствующих абзацев.",
      "Значок комментария возле блока показывает, что к этому месту уже есть заметки; на компьютере короткие комментарии видны рядом с текстом, на телефоне - под блоком.",
      "Комментарии общие для всех читателей: оставляйте уточнения, вопросы и клинические акценты так, чтобы они помогали следующему человеку.",
    ]);
  });
});
