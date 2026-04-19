import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { parseStudyMarkdown, sha256 } from "../src/lib/content/parser.ts";
import {
  SOURCE_MARKDOWN_PATH,
  SOURCE_PDF_PATH,
  SOURCE_PDF_RELATIVE_PATH,
} from "../src/lib/content/paths.ts";

const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
const pdf = fs.readFileSync(SOURCE_PDF_PATH);
const parsed = parseStudyMarkdown(markdown);
const pdfInfo = execFileSync("pdfinfo", [SOURCE_PDF_PATH], { encoding: "utf8" });
const pageCount = Number(pdfInfo.match(/^Pages:\s+(\d+)$/m)?.[1] ?? 0) || null;

const payload = {
  sourceDocument: {
    title: parsed.title,
    sourcePath: SOURCE_PDF_RELATIVE_PATH,
    pdfSha256: sha256(pdf),
    contentSha256: parsed.contentHash,
    pageCount,
    revisionDate: parsed.revisionDate,
    metadata: {
      language: parsed.language,
      basis: parsed.basis,
    },
  },
  themes: parsed.themes.map((theme) => ({
    themeKey: theme.themeKey,
    slug: theme.slug,
    title: theme.title,
    sortOrder: theme.sortOrder,
    contentHash: theme.contentHash,
    blocks: theme.blocks.map((block) => ({
      blockKey: block.blockKey,
      kind: block.kind,
      headingLevel: block.headingLevel,
      text: block.text,
      sortOrder: block.sortOrder,
      contentHash: block.contentHash,
    })),
  })),
};

const outputPath = path.resolve(process.cwd(), "tmp", "study-content-payload.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

console.log(outputPath);
