import fs from "node:fs";

import { parseStudyMarkdown, sha256 } from "../src/lib/content/parser.ts";
import { SOURCE_MARKDOWN_PATH, SOURCE_MARKDOWN_RELATIVE_PATH } from "../src/lib/content/paths.ts";

function main() {
  const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
  const parsed = parseStudyMarkdown(markdown);

  const sourceNumberedThemes = parsed.themes.filter((theme) => theme.themeKey.startsWith("theme-"));

  if (parsed.themes.length !== 19) {
    throw new Error(`Expected 19 website sections after removing the normative map, found ${parsed.themes.length}.`);
  }

  if (sourceNumberedThemes.length !== 17) {
    throw new Error(`Expected 17 source-numbered exam themes after removing theme 1, found ${sourceNumberedThemes.length}.`);
  }

  if (parsed.themes.some((theme) => /^\d+\./.test(theme.title))) {
    throw new Error("Theme titles must not include source numbering.");
  }

  if (markdown.includes("Нормативная карта экзамена")) {
    throw new Error("The removed normative map must not be present in source.md.");
  }

  if (SOURCE_MARKDOWN_RELATIVE_PATH !== "content/source.md") {
    throw new Error(`Expected exported source path content/source.md, found ${SOURCE_MARKDOWN_RELATIVE_PATH}.`);
  }

  console.log("Source verified");
  console.log(`Source Markdown SHA-256: ${sha256(markdown)}`);
  console.log(`Markdown SHA-256: ${parsed.contentHash}`);
  console.log(`Website sections: ${parsed.themes.length}`);
  console.log(`Source-numbered exam themes: ${sourceNumberedThemes.length}`);
  console.log(`Blocks: ${parsed.themes.reduce((sum, theme) => sum + theme.blocks.length, 0)}`);
}

main();
