import fs from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AbbreviatedText } from "../src/components/reader/abbreviated-text";
import {
  extractAbbreviations,
  splitTextByAbbreviations,
} from "../src/lib/content/abbreviations";
import { parseStudyMarkdown } from "../src/lib/content/parser";
import { SOURCE_MARKDOWN_PATH } from "../src/lib/content/paths";

const parsed = parseStudyMarkdown(fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8"));
const abbreviations = extractAbbreviations(parsed.themes);
const sourceMarkdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");

function dictionaryTermsFromSource() {
  const dictionaryMatch = sourceMarkdown.match(/## Словарь аббревиатур\n([\s\S]*?)(?=\n## )/);
  const dictionarySource = dictionaryMatch?.[1] ?? "";

  return dictionarySource
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .flatMap((line) => {
      const [leftSide] = line.split(/\s+-\s+/, 1);
      return [...leftSide.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
    });
}

describe("abbreviations", () => {
  it("extracts dictionary entries and synonyms from the abbreviation theme", () => {
    expect(abbreviations.find((item) => item.term === "ABCDE")?.definition).toContain(
      "расширенный первичный осмотр",
    );
    expect(abbreviations.find((item) => item.term === "ЛМА")?.definition).toContain(
      "ларингеальная маска",
    );
    expect(abbreviations.find((item) => item.term === "LMA")?.definition).toContain(
      "ларингеальная маска",
    );
    expect(abbreviations.find((item) => item.term === "LMWH")?.definition).toContain(
      "низкомолекулярный гепарин",
    );
    expect(abbreviations.find((item) => item.term === "НМГ")?.definition).toContain(
      "низкомолекулярный гепарин",
    );
    expect(abbreviations.find((item) => item.term === "ECMO")?.definition).toContain(
      "экстракорпоральная мембранная оксигенация",
    );
    expect(abbreviations.find((item) => item.term === "ЕКМО")?.definition).toContain(
      "экстракорпоральная мембранная оксигенация",
    );
    expect(abbreviations.find((item) => item.term === "КПА")?.definition).toContain(
      "контролируемая пациентом аналгезия",
    );
    expect(abbreviations.find((item) => item.term === "КПЕА")?.definition).toContain(
      "эпидуральная аналгезия",
    );
  });

  it("keeps one normalized dictionary definition per abbreviation term", () => {
    const terms = dictionaryTermsFromSource();
    const duplicates = terms.filter((term, index) => terms.indexOf(term) !== index);

    expect(duplicates).toEqual([]);
    expect(abbreviations.find((item) => item.term === "NCS")?.definition).toContain(
      "Nociception Coma Scale",
    );
    expect(abbreviations.find((item) => item.term === "NCS")?.definition).not.toContain(
      "Nonverbal Pain Scale",
    );
  });

  it("matches longest abbreviations first and avoids partial word matches", () => {
    const parts = splitTextByAbbreviations(
      "ABCDE важнее ABC, PONV-риск и `PNB` требуют внимания, но СЛРочка не термин.",
      abbreviations,
    );

    expect(parts.filter((part) => part.type === "abbr").map((part) => part.text)).toEqual([
      "ABCDE",
      "ABC",
      "PONV",
      "PNB",
    ]);
    expect(parts.map((part) => part.text).join("")).toBe(
      "ABCDE важнее ABC, PONV-риск и PNB требуют внимания, но СЛРочка не термин.",
    );
  });

  it("highlights newer perioperative abbreviations in slash and hyphen contexts", () => {
    const parts = splitTextByAbbreviations("PCA/PCEA, CPNB и PONV-риск после PNB.", abbreviations);

    expect(parts.filter((part) => part.type === "abbr").map((part) => part.text)).toEqual([
      "PCA",
      "PCEA",
      "CPNB",
      "PONV",
      "PNB",
    ]);
  });

  it("renders accessible abbreviation definition popovers", () => {
    const html = renderToStaticMarkup(
      <AbbreviatedText text="Контроль ABCDE и MAP обязателен." abbreviations={abbreviations} />,
    );

    expect(html).toContain('data-abbreviation-term="ABCDE"');
    expect(html).toContain("data-abbreviation-popover-trigger");
    expect(html).toContain('aria-label="ABCDE"');
    expect(html).toContain('data-abbreviation-term="MAP"');
    expect(html).toContain('aria-label="MAP"');
    expect(html).not.toContain("ABCDE: расширенный первичный осмотр");
  });
});
