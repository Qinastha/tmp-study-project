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
      "Фокус конспекта - госпитальный этап АИТ: от приемного отделения, операционной и ОИТ до профильного отделения, диагностического кабинета или внутрибольничного транспорта; догоспитальную сортировку не разбираем.",
      "В режиме одной темы используйте навигацию назад/далее, чтобы идти по материалу без отвлечений.",
      "В режиме всех тем удобно быстро повторять материал подряд и видеть те же комментарии возле соответствующих абзацев.",
      "Значок комментария возле блока показывает, что к этому месту уже есть заметки; на компьютере короткие комментарии видны рядом с текстом, на телефоне - под блоком.",
      "Комментарии общие для всех читателей: оставляйте уточнения, вопросы и клинические акценты так, чтобы они помогали следующему человеку.",
    ]);
  });

  it("documents the Krok 3 coverage map and key codes", () => {
    const coverageMapPath = path.resolve(process.cwd(), "docs/curriculum-coverage-map.md");

    expect(fs.existsSync(coverageMapPath)).toBe(true);

    const coverageMap = fs.readFileSync(coverageMapPath, "utf8");

    expect(coverageMap).toContain("Preoperative consultation, preparation, and risk assessment - `20%`");
    expect(coverageMap).toContain("Pediatric anesthetic management and intensive care - `30%`");
    expect(coverageMap).toContain("Source Inventory Moved Out Of `source.md`");
    expect(coverageMap).toContain("Do not copy MCP commands");
    expect(coverageMap).toContain("active study content is hospital-stage AIT");
    expect(coverageMap).toContain("Order `110/2012`, updated by `1614/2021`");
    expect(coverageMap).toContain("Obstetric hemorrhage - order `205/2014`");
    expect(coverageMap).toContain("Toxicology - order `435/2006`");
    expect(coverageMap).toContain("ASRA LAST checklist");
    expect(coverageMap).toContain("MHAUS");
    expect(coverageMap).toContain("Initial, resuscitation, and post-resuscitation care for newborns - `ГС 2025-536`");
    expect(coverageMap).toContain("Surviving Sepsis Campaign Pediatric Guidelines 2026");
    expect(coverageMap).toContain("CKD V with hemodialysis/peritoneal dialysis - `ГС 2016-89`");
    expect(coverageMap).toContain("Cirrhosis and cirrhosis complications - `МОЗ 2024-1734`");
    expect(coverageMap).toContain("KDIGO 2024 CKD Guideline");
    expect(coverageMap).toContain("American Society of Hematology 2019 VTE prevention guideline");
    expect(coverageMap).toContain("ASRA Pain Medicine 2025 antithrombotic/neuraxial guideline");
    expect(coverageMap).toContain("ASRA Pain Medicine 2025 antithrombotic/regional guideline");
    expect(coverageMap).toContain("Fifth Consensus Guidelines for PONV 2025");
    expect(coverageMap).toContain("ESICM 2023 ARDS guideline");
    expect(coverageMap).toContain("Volpicelli et al. 2012 international evidence-based recommendations");
    expect(coverageMap).toContain("ICS/FICM 2019 guidance on transfer of the critically ill adult");
    expect(coverageMap).toContain("Via et al. 2014 international evidence-based recommendations for focused cardiac ultrasound");
    expect(coverageMap).toContain("Focused Intensive Care Echo (`FICE`) literature");
    expect(coverageMap).toContain("WSES Bologna guidelines for adhesive small bowel obstruction");
    expect(coverageMap).toContain("UK Kidney Association Hyperkalaemia Guideline, October 2023");
    expect(coverageMap).toContain("European Clinical Practice Guideline on Hyponatraemia, 2014");
    expect(coverageMap).toContain("MSD/Merck Manual Professional acid-base disorder chapters");
    expect(coverageMap).toContain("ISHLT Guidelines for the Care of Heart Transplant Recipients");
    expect(coverageMap).toContain("ISHLT Summary of the Consensus Conference on Graft Dysfunction within the First 72 hours");
    expect(coverageMap).toContain("ISHLT Working Group on Primary Lung Graft Dysfunction");
    expect(coverageMap).toContain("The `theme-23` antidote table is now practical rather than `435/2006`-only");
    expect(coverageMap).toContain("hydroxocobalamin, fomepizole, pralidoxime, and lipid emulsion require separate current sources");
    expect(coverageMap).toContain("| `2.5.2.1` | Perioperative cardiac/hemodynamic ultrasound | `theme-08`, `theme-15` | Partial |");
    expect(coverageMap).toContain("| `5.4.1.0` | TTE cardiac protocols | `theme-15` | Partial |");
    expect(coverageMap).toContain("| `5.3.0.0` | Acute bowel obstruction | `theme-18` | Partial |");
    expect(coverageMap).toContain("| `5.3.1.0` | Electrolyte and acid-base disorders | `theme-18` | Partial |");
    expect(coverageMap).toContain("| `5.6.0.0` | ICU after heart/lung transplantation | `theme-15` | Partial |");
    expect(coverageMap).toContain("Protokol-peryoperatsijnogo-znebolennya.docx");
    expect(coverageMap).toContain("| `2.4.3.0` | Upper-limb peripheral nerve blocks | `theme-05`, `theme-21` | Partial |");
    expect(coverageMap).toContain("| `2.4.4.0` | Lower-limb peripheral nerve blocks | `theme-05`, `theme-21` | Partial |");
    expect(coverageMap).toContain("| `2.4.5.0` | Trunk, chest, and abdominal blocks | `theme-05`, `theme-21` | Partial |");
    expect(coverageMap).toContain("| `3.1.2.0` | Systemic analgesia and PCA | `theme-07` | Partial |");
    expect(coverageMap).toContain("| `3.2.0.0` | Prolonged neuraxial/regional techniques | `theme-04`, `theme-05`, `theme-07` | Partial |");
    expect(coverageMap).toContain("| `5.5.1.0` | Mass-casualty triage | `theme-16` | Out of current scope");

    for (const code of [
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
    ]) {
      expect(coverageMap).toContain(`\`${code}\``);
    }
  });

  it("keeps technical workflow details in docs instead of source.md", () => {
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const guide = fs.readFileSync("docs/mcp-content-update-guide.md", "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(markdown).not.toContain("REVALIDATE_SECRET");
    expect(markdown).not.toContain("tmp-study-project");
    expect(markdown).not.toContain("/Users/qinastha");
    expect(markdown).not.toContain("sourcePath");
    expect(markdown).not.toContain("MCP");

    expect(guide).toContain("POST https://tmp-study-project.vercel.app/api/revalidate");
    expect(guide).toContain('sourcePath: "content/source.md"');
    expect(coverageMap).toContain("/Users/qinastha/Downloads/Учеба/Анест");
  });

  it("keeps a pre-reseed source audit for the current Markdown content", () => {
    const auditPath = path.resolve(process.cwd(), "docs/source-audit-2026-04-21.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");

    expect(audit).toContain("PASS WITH WARNINGS");
    expect(audit).toContain("Supabase Reset/Reseed Log");
    expect(audit).toContain("antidote table tied specifically to order `МОЗ №435/2006`");
    expect(audit).toContain("docs/curriculum-coverage-map.md` no longer has rows marked `Gap`");
    expect(audit).toContain("MCP reseed");
  });

  it("keeps Krok code mapping in docs instead of reader source", () => {
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(markdown).not.toContain("Покрывает коды Крок 3");
    expect(markdown).not.toMatch(/\b[1-6]\.\d+\.\d+\.\d+\b/);
    expect(markdown).not.toMatch(/экзамен|экзаменац|устн/i);
    expect(coverageMap).toContain("Detailed Krok Mapping");
    expect(coverageMap).toContain("| `1.1.1.0` | Airway assessment | `theme-01`, `theme-03` | Partial |");
  });

  it("keeps the 2026-04-26 source verification audit for high-risk clinical facts", () => {
    const auditPath = path.resolve(process.cwd(), "docs/source-verification-audit-2026-04-26.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");

    expect(audit).toContain("Risk-first source verification ledger");
    expect(audit).toContain("MOH-first");

    for (const themeKey of [
      "theme-06",
      "theme-11",
      "theme-12",
      "theme-14",
      "theme-21",
      "theme-22",
      "theme-23",
      "theme-24",
    ]) {
      expect(audit).toContain(`\`${themeKey}\``);
    }
  });

  it("uses a practical toxicology antidote table with source status", () => {
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");

    expect(markdown).toContain("Практическая таблица антидотов");
    expect(markdown).toContain("отравление/ситуация | антидот | взрослая доза и путь | дети/особые группы | контроль/главный риск | источник/статус");
    expect(markdown).toContain("ФОС/органофосфаты | `Атропин + пралидоксим`");
    expect(markdown).toContain("Токсические спирты | `Fomepizole`; `этанол` только если fomepizole недоступен");
    expect(markdown).toContain("Цианиды/дым закрытого пожара | `Гидроксокобаламин`");
    expect(markdown).toContain("LAST | `20% липидная эмульсия`");
    expect(markdown).toContain("№435 historical");
    expect(markdown).toContain("DailyMed label");
    expect(markdown).toContain("ASRA LAST checklist 2020");
    expect(markdown).not.toContain("Позиции из приказа МОЗ №435: препарат | где упоминается | доза/схема в приказе | комментарий для конспекта");
    expect(markdown).not.toContain("метанол: `5%` раствор");
    expect(markdown).not.toContain("суммарно `1 г/кг/сут` в пересчете на `96%` этанол");
    expect(markdown).not.toContain("источник неизвестен");
  });

  it("keeps reader-facing source text away from informal placeholders", () => {
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");

    for (const phrase of [
      "где-то в отделении",
      "продавить любой ценой",
      "маленькая ОИТ в движении",
      "обычным поведением",
      "капельнице и наблюдении",
      "маленького взрослого",
      "красиво снизится",
      "красив",
      "неубийствен",
      "ability to ventilate",
      "волшебный",
      "тестовый контрольационная",
      "тестовый контрольационно",
      "тестового контроля",
      "тестовом контроле",
      "хороший разбор",
      "удобная учебная формулировка",
      "Высокодоходный учебный тезис",
      "что держать в голове без шпаргалки",
      "которые любят спрашивать",
      "Что спрашивают у анестезиолога",
      "не стать вторым пострадавшим",
      "для красоты",
      "на всякий случай",
      "обычной болью",
      "банальный `цефтриаксон`",
      "лечу не только цифру",
    ]) {
      expect(markdown).not.toContain(phrase);
    }
  });
});
