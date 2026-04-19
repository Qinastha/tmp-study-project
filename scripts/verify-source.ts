import fs from "node:fs";
import { execFileSync } from "node:child_process";

import { parseStudyMarkdown, sha256 } from "../src/lib/content/parser.ts";
import { SOURCE_MARKDOWN_PATH, SOURCE_PDF_PATH } from "../src/lib/content/paths.ts";

function main() {
  const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
  const pdf = fs.readFileSync(SOURCE_PDF_PATH);
  const parsed = parseStudyMarkdown(markdown);
  const pdfInfo = execFileSync("pdfinfo", [SOURCE_PDF_PATH], {
    encoding: "utf8",
  });

  const pages = Number(pdfInfo.match(/^Pages:\s+(\d+)$/m)?.[1] ?? 0);

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

  if (pages !== 43) {
    throw new Error(`Expected 43 PDF pages, found ${pages}.`);
  }

  console.log("Source verified");
  console.log(`PDF SHA-256: ${sha256(pdf)}`);
  console.log(`Markdown SHA-256: ${parsed.contentHash}`);
  console.log(`Website sections: ${parsed.themes.length}`);
  console.log(`Source-numbered exam themes: ${sourceNumberedThemes.length}`);
  console.log(`Blocks: ${parsed.themes.reduce((sum, theme) => sum + theme.blocks.length, 0)}`);
  console.log(`Pages: ${pages}`);
}

main();
