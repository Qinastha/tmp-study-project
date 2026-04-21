import fs from "node:fs";
import path from "node:path";

import { parseStudyMarkdown, sha256 } from "../src/lib/content/parser.ts";
import { SOURCE_MARKDOWN_PATH, SOURCE_MARKDOWN_RELATIVE_PATH } from "../src/lib/content/paths.ts";

const EXPECTED_THEME_COUNT = 27;
const EXPECTED_KROK_MODULE_COUNT = 25;
const MINIMUM_LINE_COUNT_FROM_BASELINE = 817;
const MINIMUM_BLOCK_COUNT_FROM_BASELINE = 648;

const FRAME_HEADINGS = [
  "Ключевые акценты",
  "Практический алгоритм",
  "Красные цифры/пороговые значения",
  "Источники и спорные места",
  "Пробелы к заполнению",
];

const REQUIRED_KROK_CODES = [
  "1.1.1.0",
  "2.2.2.0",
  "2.4.1.0",
  "2.6.2.0",
  "3.2.2.0",
  "4.1.0.0",
  "4.6.0.0",
  "5.1.1.0",
  "5.2.0.0",
  "5.5.3.0",
  "6.1.1.0",
  "6.5.0.0",
];

const LEGACY_TOPICS = [
  "СЛР",
  "ООКБ",
  "ЭФГДС",
  "Нутритивная поддержка",
  "Акушерство",
  "травма",
  "инсульт",
  "антибиотик",
  "диабет",
  "ХОЗЛ",
  "ОКС",
  "ТЭЛА",
  "Сепсис",
  "контрольный список действий по безопасности анестезии",
  "акушерское кровотечение",
  "местные анестетики",
  "Периферические блоки конечностей",
  "Блоки туловища, груди и живота",
  "Продленные периферические катетеры",
  "УЗ-навигация",
  "межлестничный/подключичный",
  "злокачественная гипертермия",
  "токсикология",
  "трансфузиология",
  "Первичная реанимация новорожденного",
  "Педиатрический сепсис",
  "Респираторная поддержка у детей",
  "Почки и печень перед анестезией",
  "VTE-риск и тромбопрофилактика",
  "PONV-риск до операции",
  "Послеоперационная тромбопрофилактика",
  "контролируемая пациентом внутривенная аналгезия",
  "служба острой боли",
  "боль `<3 баллов` в покое",
  "PCEA и продленная катетерная аналгезия",
  "госпитальный этап АИТ",
  "ARDS: госпитальный алгоритм",
  "Lung ultrasound при дыхательной недостаточности",
  "Транспорт пациента на ИВЛ внутри больницы",
  "FoCUS/TTE при периоперационной нестабильности",
  "TTE/FoCUS протокол при шоке",
  "Кардиогенный шок: госпитальная рамка",
  "parasternal long axis",
  "догоспитальную сортировку не разбираем",
  "Острая кишечная непроходимость: госпитальный АИТ-алгоритм",
  "Электролиты и КОС: первичный ОИТ-подход",
  "КОС: пошаговая интерпретация",
  "Метаболический ацидоз",
  "Респираторный ацидоз",
  "Респираторный алкалоз",
  "Смешанные нарушения КОС",
  "Метаболический алкалоз при рвоте и декомпрессии желудка",
  "WSES Bologna guidelines",
  "UK Kidney Association Hyperkalaemia Guideline 2023",
  "ОИТ после трансплантации сердца и легких",
  "ISHLT Guidelines for the Care of Heart Transplant Recipients 2023",
  "Таблица антидотов",
  "N-ацетилцистеин",
  "Атропин + диэтиксим",
  "Этанол",
  "не найдены в приказе №435",
];

const TECHNICAL_SOURCE_TERMS = [
  "MCP",
  "Supabase",
  "sourcePath",
  "content:export",
  "source:verify",
  "revalidate",
  "REVALIDATE_SECRET",
  "tmp-study-project",
  "docs/curriculum",
  "/Users/qinastha",
  "Источниковая база и материалы для сверки",
];

function main() {
  const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
  const coverageMap = fs.readFileSync(path.resolve(process.cwd(), "docs/curriculum-coverage-map.md"), "utf8");
  const parsed = parseStudyMarkdown(markdown);

  const sourceNumberedThemes = parsed.themes.filter((theme) => theme.themeKey.startsWith("theme-"));

  if (parsed.themes.length !== EXPECTED_THEME_COUNT) {
    throw new Error(`Expected ${EXPECTED_THEME_COUNT} website sections, found ${parsed.themes.length}.`);
  }

  if (sourceNumberedThemes.length !== EXPECTED_KROK_MODULE_COUNT) {
    throw new Error(
      `Expected ${EXPECTED_KROK_MODULE_COUNT} Krok modules, found ${sourceNumberedThemes.length}.`,
    );
  }

  if (parsed.themes.some((theme) => /^\d+\./.test(theme.title))) {
    throw new Error("Theme titles must not include source numbering.");
  }

  const legacyNumberedHeadings = parsed.themes.flatMap((theme) =>
    theme.blocks
      .filter(
        (block) =>
          block.kind === "heading" &&
          (/^(Перенесенный материал:\s*)?\d+\./.test(block.text) ||
            block.text.startsWith("Перенесенный материал:")),
      )
      .map((block) => `${theme.themeKey}: ${block.text}`),
  );

  if (legacyNumberedHeadings.length > 0) {
    throw new Error(`Nested headings must not keep legacy numbering: ${legacyNumberedHeadings.join("; ")}`);
  }

  if (markdown.includes("Нормативная карта экзамена")) {
    throw new Error("The removed normative map must not be present in source.md.");
  }

  if (markdown.includes("Покрывает коды Крок 3") || /\b[1-6]\.\d+\.\d+\.\d+\b/.test(markdown)) {
    throw new Error("Krok code mapping must live in docs/curriculum-coverage-map.md, not source.md.");
  }

  if (/экзамен|экзаменац|устн/i.test(markdown)) {
    throw new Error("Reader source should avoid exam-answer/oral-answer phrasing for the written Krok test format.");
  }

  if (SOURCE_MARKDOWN_RELATIVE_PATH !== "content/source.md") {
    throw new Error(`Expected exported source path content/source.md, found ${SOURCE_MARKDOWN_RELATIVE_PATH}.`);
  }

  if (/source:pdf|source\.pdf|pdfSha256|pageCount/.test(markdown)) {
    throw new Error("PDF data-flow terms must not be present in source.md.");
  }

  for (const term of TECHNICAL_SOURCE_TERMS) {
    if (markdown.includes(term)) {
      throw new Error(`Technical workflow term must live in docs, not source.md: ${term}.`);
    }
  }

  if (markdown.split("\n").length < MINIMUM_LINE_COUNT_FROM_BASELINE) {
    throw new Error("source.md became shorter than the preserved baseline.");
  }

  const blockCount = parsed.themes.reduce((sum, theme) => sum + theme.blocks.length, 0);
  if (blockCount < MINIMUM_BLOCK_COUNT_FROM_BASELINE) {
    throw new Error("Parsed block count became smaller than the preserved baseline.");
  }

  for (const theme of sourceNumberedThemes) {
    const headingTexts = theme.blocks.filter((block) => block.kind === "heading").map((block) => block.text);
    const headings = new Set(headingTexts);
    for (const heading of FRAME_HEADINGS) {
      if (!headings.has(heading)) {
        throw new Error(`${theme.themeKey} is missing normalized frame heading: ${heading}.`);
      }
    }

    const lastHeading = headingTexts.at(-1);
    if (lastHeading !== "Пробелы к заполнению") {
      throw new Error(`${theme.themeKey} must keep "Пробелы к заполнению" as its last subsection.`);
    }
  }

  for (const code of REQUIRED_KROK_CODES) {
    if (!coverageMap.includes(code)) {
      throw new Error(`Required Krok 3 code ${code} is missing from docs/curriculum-coverage-map.md.`);
    }
  }

  for (const topic of LEGACY_TOPICS) {
    if (!markdown.includes(topic)) {
      throw new Error(`Representative preserved topic is missing from source.md: ${topic}.`);
    }
  }

  console.log("Source verified");
  console.log(`Source Markdown SHA-256: ${sha256(markdown)}`);
  console.log(`Markdown SHA-256: ${parsed.contentHash}`);
  console.log(`Website sections: ${parsed.themes.length}`);
  console.log(`Krok modules: ${sourceNumberedThemes.length}`);
  console.log(`Blocks: ${blockCount}`);
}

main();
