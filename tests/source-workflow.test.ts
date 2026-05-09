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
    expect(guide).toContain("Markdown pipe tables must be exported as row-level blocks");
    expect(guide).toContain("no active Supabase content block may contain a Markdown separator row such as `| --- |`");
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
    const parsed = parseStudyMarkdown(markdown);

    expect(markdown).not.toContain("Покрывает коды Крок 3");
    expect(markdown).not.toMatch(/\b[1-6]\.\d+\.\d+\.\d+\b/);
    expect(markdown).not.toMatch(/экзамен|экзаменац|устн/i);
    expect(
      parsed.themes
        .flatMap((theme) => theme.blocks)
        .filter((block) => /\|\s*:?-{3,}:?\s*\|/.test(block.text)),
    ).toEqual([]);
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

  it("keeps a 2026-05-07 gap-fill ledger and closes source-verified P0 gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");

    for (const themeKey of [
      "theme-06",
      "theme-11",
      "theme-12",
      "theme-19",
      "theme-21",
      "theme-22",
      "theme-23",
      "theme-24",
    ]) {
      expect(audit).toContain(`\`${themeKey}\``);
    }

    expect(audit).toContain("PASS WITH WARNINGS");
    expect(audit).toContain("verified");
    expect(audit).toContain("blocked-local");
    expect(markdown).toContain("Таблица максимальных доз местных анестетиков");
    expect(markdown).toContain("Лидокаин без адреналина | `4,5 мг/кг`, обычно не более `300 мг`");
    expect(markdown).toContain("Злокачественная гипертермия: алгоритм с дантроленом");
    expect(markdown).toContain("Дантролен | старт `2,5 мг/кг в/в`");
    expect(markdown).toContain("Экстракорпоральная элиминация при отравлениях");
    expect(markdown).toContain("Трансфузионные реакции");
    expect(markdown).toContain("Педиатрический airway и периоперационная жидкость");

    for (const resolvedGap of [
      "Добавить таблицу максимальных доз ЛА",
      "Malignant hyperthermia требует источникового алгоритма с дантроленом.",
      "Добавить критерии гемодиализа/экстракорпоральной элиминации при литии",
      "Добавить таблицу трансфузионных реакций",
      "Детская анестезия требует таблицы размеров оборудования",
    ]) {
      expect(markdown).not.toContain(resolvedGap);
    }
  });

  it("keeps a 2026-05-07 wave 2 ledger and closes perioperative table gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 2 - perioperative tables");
    expect(audit).toContain("ГС 2026-540");

    for (const themeKey of ["theme-01", "theme-04", "theme-09", "theme-10"]) {
      expect(audit).toContain(`\`${themeKey}\``);
    }

    expect(markdown).toContain("Нейроаксиальные и deep plexus/deep peripheral интервалы");
    expect(markdown).toContain("Профилактическая НМГ | `>=12 часов`");
    expect(markdown).toContain("High-dose DOAC");
    expect(markdown).toContain("Supplemental lumbar puncture antithrombotic table");
    expect(markdown).toContain("Clopidogrel | `7 days` | `6 hours`");
    expect(markdown).toContain("Apixaban prophylaxis | `48 hours if CrCl >50 mL/min`; `72 hours if CrCl 30-50 mL/min` | `6 hours`");
    expect(markdown).toContain("Dabigatran therapeutic | `72-96 hours if CrCl >50 mL/min`; `120 hours if CrCl <50 mL/min` | `6 hours`");
    expect(markdown).toContain("Alteplase / TPA | `48 hours` and fibrinogen `>200 mg/dL` before LP | `10 days`");
    expect(markdown).toContain("PONV: дозы и ограничения");
    expect(markdown).toContain("Ондансетрон | `4 мг в/в/вм`");
    expect(markdown).toContain("Парентеральная периоперационная антибиотикопрофилактика — приказ МОЗ №540 от 23.04.2026");
    expect(markdown).toContain("Антибиотикопрофилактика: время, дозы и повтор");
    expect(markdown).toContain("Цефазолин | `2 г в/в`; при массе `>120 кг` - `3 г`");
    expect(coverageMap).toContain("Parenteral perioperative antibiotic prophylaxis - `ГС 2026-540`");
    expect(coverageMap).toContain("Supplemental LP antithrombotic table from user-provided image");

    for (const resolvedGap of [
      "Нужна полноценная таблица антикоагулянтов и нейроаксиальных интервалов",
      "Нужна локальная таблица `PONV`",
      "нужна таблица времени профилактической дозы и повторного дозирования.",
      "Парентеральная периоперационная антибиотикопрофилактика — приказ МОЗ №822",
    ]) {
      expect(markdown).not.toContain(resolvedGap);
    }
  });

  it("keeps a 2026-05-07 wave 3 ledger and closes adult ICU ARDS/sepsis table gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 3 - adult ICU respiratory and sepsis source control");
    expect(audit).toContain("ATS 2024 ARDS");
    expect(audit).toContain("SSC 2026 adult sepsis");

    for (const themeKey of ["theme-13", "theme-14"]) {
      expect(audit).toContain(`\`${themeKey}\``);
    }

    expect(markdown).toContain("ARDS: вентиляция и эскалация");
    expect(markdown).toContain("Vt `4-8 мл/кг PBW`, старт обычно `6 мл/кг PBW`");
    expect(markdown).toContain("VV-ECMO");
    expect(markdown).toContain("`P/F <50` более `3 часов`");
    expect(markdown).toContain("Source control и антибактериальная деэскалация");
    expect(markdown).toContain("идеально в пределах `6 часов`");
    expect(markdown).toContain("48-72 часа | культура/ПЦР/клиника уже должны изменить терапию");
    expect(coverageMap).toContain("ATS 2024 ARDS guideline update");
    expect(coverageMap).toContain("Surviving Sepsis Campaign Adult Guidelines 2026");

    for (const resolvedGap of [
      "Нужна локальная таблица режимов ИВЛ и эскалации при `ARDS`: `PEEP/FiO2`, prone, нейромышечная блокада, ECMO-критерии.",
      "Нужна таблица source control и антибактериальной деэскалации.",
    ]) {
      expect(markdown).not.toContain(resolvedGap);
    }
  });

  it("keeps a 2026-05-07 wave 4 ledger and closes metabolic electrolyte escalation gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 4 - metabolic electrolytes and renal escalation");
    expect(audit).toContain("UKKA 2023");
    expect(audit).toContain("European hyponatraemia guideline 2014");
    expect(audit).toContain("KDIGO AKI 2012");
    expect(audit).toContain("`theme-18`");
    expect(markdown).toContain("Гиперкалиемия: неотложная коррекция");
    expect(markdown).toContain("Кальция глюконат `10%` | `30 мл в/в за 10 минут`");
    expect(markdown).toContain("Инсулин-глюкоза | `10 ЕД` растворимого/короткого инсулина + `25 г` глюкозы в/в");
    expect(markdown).toContain("Сальбутамол небулайзер | `10-20 мг`");
    expect(markdown).toContain("Гипонатриемия: 3% NaCl и пределы коррекции");
    expect(markdown).toContain("3% NaCl | `150 мл за 20 минут`");
    expect(markdown).toContain("Показания к срочному диализу/заместительной почечной терапии");
    expect(markdown).toContain("рефрактерная гиперкалиемия");
    expect(coverageMap).toContain("| `theme-18` | Partial, improved 2026-05-09 wave 18 |");

    expect(markdown).not.toContain(
      "нужна локальная таблица дозовой коррекции `K`, `Na`, `Ca`, `Mg`, `P`, гипертонического NaCl, глюкозо-инсулиновой схемы и показаний к диализу.",
    );
  });

  it("keeps a 2026-05-07 wave 5 ledger and closes neurocritical TBI/seizure/transport gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 5 - neurocritical TBI seizures and transport");
    expect(audit).toContain("ГС 2024-1237-3");
    expect(audit).toContain("Brain Trauma Foundation severe TBI 4th edition");
    expect(audit).toContain("AES 2016 convulsive status epilepticus guideline");
    expect(audit).toContain("ICS/FICM 2019 transfer guideline");
    expect(audit).toContain("`theme-17`");
    expect(markdown).toContain("ЧМТ: первичный госпитальный нейро-ОИТ алгоритм");
    expect(markdown).toContain("ЧМТ: целевые параметры и osmotherapy");
    expect(markdown).toContain("3% NaCl | `100-250 мл за 10 минут`");
    expect(markdown).toContain("Маннитол | `0,25-1 г/кг`");
    expect(markdown).toContain("Судороги и эпистатус в нейро-ОИТ");
    expect(markdown).toContain("Лоразепам | `0,1 мг/кг в/в`, максимум `4 мг`");
    expect(markdown).toContain("Фосфенитоин/фенитоин | `20 мг PE/кг`");
    expect(markdown).toContain("Кома и транспорт пациента на ИВЛ");
    expect(markdown).toContain("EtCO2 обязателен");
    expect(coverageMap).toContain("| `theme-17` | Partial, improved 2026-05-07 wave 5 |");

    for (const resolvedGap of [
      "ЧМТ как самостоятельный Krok-блок.",
      "Кома, судороги/эпистатус и транспорт на ИВЛ.",
    ]) {
      expect(markdown).not.toContain(resolvedGap);
    }
  });

  it("keeps a 2026-05-07 wave 6 ledger and closes trauma burn/hypothermia gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 6 - trauma burns hypothermia and damage-control warming");
    expect(audit).toContain("ГС 2024-1869");
    expect(audit).toContain("ГС 2025-1555-1");
    expect(audit).toContain("ГС 2025-1555-4");
    expect(audit).toContain("WHO 2024 burn mass-casualty standards");
    expect(audit).toContain("`theme-16`");
    expect(markdown).toContain("`TBSA` или `ЗПОП` - total body surface area");
    expect(markdown).toContain("`COHb` - carboxyhemoglobin");
    expect(markdown).toContain("Ожоги: госпитальная оценка, инфузия и ОИТ");
    expect(markdown).toContain("взрослые и дети `>=14 лет` | `2 мл x кг x %TBSA`");
    expect(markdown).toContain("дети `<=13 лет` | `3 мл x кг x %TBSA`");
    expect(markdown).toContain("электрические ожоги | `4 мл x кг x %TBSA`");
    expect(markdown).toContain("дополнительный вариант Parkland/Baxter | `4 мл x кг x %TBSA`");
    expect(markdown).toContain("не основной расчет украинского стандарта");
    expect(markdown).toContain("половина за первые `8 часов` от момента ожога");
    expect(markdown).toContain("Ожоги: красные флаги ингаляционной травмы и маршрутизации");
    expect(markdown).toContain("100% кислород до нормализации `COHb`");
    expect(markdown).toContain("Гипотермия при травме: профилактика и согревание");
    expect(markdown).toContain("легкая травма-индуцированная гипотермия | `34-36 °C`");
    expect(markdown).toContain("растворы/компоненты крови | подогреть до `38-42 °C`");
    expect(markdown).toContain("поддерживать температуру тела `>35,5 °C`");
    expect(coverageMap).toContain("| `theme-16` | Partial, improved 2026-05-07 wave 6 |");

    expect(markdown).not.toContain("Ожоги и гипотермия из приказов 2025 требуют отдельного расширения.");
  });

  it("keeps a 2026-05-07 wave 7 ledger and closes cardiogenic shock/MINS gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 7 - cardiogenic shock and perioperative myocardial injury");
    expect(audit).toContain("SCAI SHOCK Stage Classification Expert Consensus Update 2022");
    expect(audit).toContain("ESC 2022 non-cardiac surgery guideline");
    expect(audit).toContain("Canadian Cardiovascular Society 2017 perioperative cardiac risk guideline");
    expect(audit).toContain("`theme-15`");
    expect(markdown).toContain("`SCAI` - Society for Cardiovascular Angiography and Interventions");
    expect(markdown).toContain("`MCS` - mechanical circulatory support");
    expect(markdown).toContain("`MINS` - myocardial injury after non-cardiac surgery");
    expect(markdown).toContain("Кардиогенный шок: SCAI-стадирование и эскалация");
    expect(markdown).toContain("Stage C / Classic shock | гипоперфузия");
    expect(markdown).toContain("Stage D / Deteriorating shock | перфузия не восстановлена");
    expect(markdown).toContain("Кардиогенный шок: вазоактивная поддержка и MCS-мост");
    expect(markdown).toContain("Норадреналин | первый препарат для поддержки давления");
    expect(markdown).toContain("IABP | не рутинно для каждого AMI-CS");
    expect(markdown).toContain("Периоперационное повреждение миокарда / MINS");
    expect(markdown).toContain("`hs-cTnT/hs-cTnI` до операции и через `24` + `48 часов`");
    expect(markdown).toContain("ежедневный тропонин `48-72 часа`");
    expect(markdown).toContain("гипотензию, анемию, гипоксемию, тахиаритмию, сепсис");
    expect(coverageMap).toContain("| `theme-15` | Partial, improved 2026-05-07 wave 7 |");
    expect(markdown).not.toContain("Периоперационный myocardial injury нужно связать с послеоперационным мониторингом тропонина.");
  });

  it("keeps a 2026-05-08 wave 8 ledger and closes postoperative pain safety-monitoring gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 8 - postoperative pain safety and PCA/PCEA monitoring");
    expect(audit).toContain("ASA 2012 acute pain guideline");
    expect(audit).toContain("FDA 2019 gabapentinoid safety communication");
    expect(audit).toContain("EMA 2024 metamizole safety measures");
    expect(audit).toContain("`theme-07`");
    expect(markdown).toContain("Системные анальгетики: ограничения и мониторинг");
    expect(markdown).toContain("препарат/класс | когда полезен | ограничения/когда избегать | что мониторировать | источник/статус");
    expect(markdown).toContain("Парацетамол | базовый неопиоидный анальгетик");
    expect(markdown).toContain("не превышать суммарно `4000 мг/сут`");
    expect(markdown).toContain("Метамизол | неопиоидный анальгетик/антипиретик");
    expect(markdown).toContain("агранулоцитоз может возникнуть в любой момент лечения");
    expect(markdown).toContain("Морфин/фентанил | opioid rescue, PCA или титрованная анальгезия");
    expect(markdown).toContain("Трамадол | слабый опиоид/серотонинергический анальгетик");
    expect(markdown).toContain("детям `<12 лет` и после tonsillectomy/adenoidectomy `<18 лет` противопоказан");
    expect(markdown).toContain("Габапентин/прегабалин | выбранные пациенты с нейропатическим компонентом");
    expect(markdown).toContain("респираторная депрессия при сочетании с опиоидами");
    expect(markdown).toContain("PCA/PCEA: больничный чек-лист наблюдения");
    expect(markdown).toContain("боль `>6/10` | переоценка каждые `15 минут`");
    expect(markdown).toContain("новый моторный блок или нарастающая боль в спине");
    expect(coverageMap).toContain("| `theme-07` | Partial, improved 2026-05-08 wave 8 |");

    expect(markdown).not.toContain(
      "Сделать отдельную таблицу противопоказаний/ограничений: `НПВП`, парацетамол, метамизол, трамадол, морфин, фентанил, кетамин, дексмедетомидин, габапентин/прегабалин.",
    );
    expect(markdown).not.toContain(
      "Добавить готовый больничный чек-лист наблюдения за `PCA/PCEA`: боль, седация, ЧДД/SpO2, тошнота, зуд, задержка мочи, моторный блок, гипотензия, признаки `LAST`.",
    );
  });

  it("keeps a 2026-05-08 wave 9 ledger and closes difficult-airway prediction gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 9 - difficult airway prediction and failed intubation");
    expect(audit).toContain("ASA 2022 difficult airway guideline");
    expect(audit).toContain("DAS 2025 unanticipated difficult intubation guideline");
    expect(audit).toContain("OAA/DAS 2015 obstetric failed intubation guideline");
    expect(audit).toContain("`theme-03`");
    expect(markdown).toContain("`DAS` - Difficult Airway Society");
    expect(markdown).toContain("`VL` - videolaryngoscopy");
    expect(markdown).toContain("`SAD` - supraglottic airway device");
    expect(markdown).toContain("`CICO` - cannot intubate, cannot oxygenate");
    expect(markdown).toContain("`eFONA` - emergency front-of-neck airway");
    expect(markdown).toContain("Предикторы трудных дыхательных путей");
    expect(markdown).toContain("проблема | предикторы | что сделать до индукции | источник/статус");
    expect(markdown).toContain("Трудная масочная вентиляция | ожирение, OSA");
    expect(markdown).toContain("Трудная ларингоскопия/интубация | ограниченное открывание рта");
    expect(markdown).toContain("Трудный `SAD`/rescue oxygenation | малое открывание рта");
    expect(markdown).toContain("Трудный `eFONA` | ожирение, массивная шея");
    expect(markdown).toContain("Неожиданная трудная интубация: взрослый госпитальный алгоритм");
    expect(markdown).toContain("цель - восстановить оксигенацию, а не выполнить еще одну попытку");
    expect(markdown).toContain("Plan A/B/C/D");
    expect(markdown).toContain("CICO | немедленно объявить `CICO`");
    expect(markdown).toContain("Failed intubation в акушерстве: связь с общей airway-темой");
    expect(markdown).toContain("wake/proceed");
    expect(coverageMap).toContain("| `theme-03` | Partial, improved 2026-05-08 wave 9 |");
    expect(coverageMap).toContain("ASA 2022 difficult airway guideline");
    expect(coverageMap).toContain("DAS 2025 unanticipated difficult intubation guideline");

    for (const resolvedGap of [
      "Нужна таблица предикторов трудной масочной вентиляции, ларингоскопии, надгортанных устройств и фронтального доступа к шее.",
      "Нужен отдельный алгоритм failed intubation в акушерстве.",
    ]) {
      expect(markdown).not.toContain(resolvedGap);
    }
  });

  it("keeps a 2026-05-09 wave 10 ledger and closes depth-monitoring and fluid table gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 10 - depth monitoring and perioperative fluids");
    expect(audit).toContain("Association of Anaesthetists 2021");
    expect(audit).toContain("NICE CG174");
    expect(audit).toContain("POQI 2024");

    for (const themeKey of ["theme-02", "theme-08", "theme-09"]) {
      expect(audit).toContain(`\`${themeKey}\``);
    }

    expect(markdown).toContain("MAC, пробуждение и выбор TIVA");
    expect(markdown).toContain("MAC снижается с возрастом");
    expect(markdown).toContain("N2O, бензодиазепины и опиоиды уменьшают потребность в летучем анестетике");
    expect(markdown).toContain("Мониторинг глубины анестезии: BIS, MAC и клинический контекст");
    expect(markdown).toContain("BIS `80-100`");
    expect(markdown).toContain("BIS `40-60`");
    expect(markdown).toContain("Инфузионная терапия: 5R и базовые взрослые ориентиры");
    expect(markdown).toContain("25-30 мл/кг/сут");
    expect(markdown).toContain("болюс `500 мл` менее чем за `15 минут`");
    expect(markdown).toContain("GDFT: когда жидкость является пробой, а не автоматической реакцией");
    expect(coverageMap).toContain("| `theme-08` | Partial, improved 2026-05-09 wave 10 |");
    expect(coverageMap).toContain("| `theme-09` | Partial, improved 2026-05-09 wave 10 |");
    expect(coverageMap).toContain("NICE CG174 intravenous fluid therapy");
    expect(coverageMap).toContain("POQI 2024 perioperative fluid management");

    for (const resolvedGap of [
      "Мониторинг глубины анестезии требует отдельного источникового разбора.",
      "goal-directed fluid therapy требует отдельного алгоритма.",
      "Нужна отдельная инфузионная таблица: поддерживающая жидкость, ресусцитация, balanced crystalloids, ограничения при ХСН/ХБП/циррозе.",
      "Нужны таблицы факторов, влияющих на MAC, пробуждение, контекст-зависимый период полувыведения и выбор TIVA.",
    ]) {
      expect(markdown).not.toContain(resolvedGap);
    }
  });

  it("keeps a 2026-05-09 wave 11 ledger and closes neuraxial complication monitoring gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 11 - neuraxial complication recognition and observation");
    expect(audit).toContain("ASRA Practice Advisory on Neurologic Complications");
    expect(audit).toContain("ASA 2021 PDPH");
    expect(audit).toContain("`theme-04`");

    expect(markdown).toContain("Осложнения нейроаксиальной анестезии: распознавание и первые действия");
    expect(markdown).toContain("Высокий/тотальный спинальный блок");
    expect(markdown).toContain("адреналин `10-100 мкг в/в`");
    expect(markdown).toContain("боли в спине + моторный/сенсорный дефицит");
    expect(markdown).toContain("вероятность восстановления быстро падает, когда время до декомпрессии приближается к `8 часам`");
    expect(markdown).toContain("PDPH");
    expect(markdown).toContain("осмотр анестезиолога в течение `24 часов`");
    expect(markdown).toContain("Лист наблюдения за нейроаксиальной/катетерной аналгезией");
    expect(markdown).toContain("моторика и чувствительность | Bromage/движение ног");
    expect(coverageMap).toContain("| `theme-04` | Partial, improved 2026-05-09 wave 11 |");
    expect(coverageMap).toContain("ASA 2021 statement on post-dural puncture headache");
    expect(coverageMap).toContain("ASRA Practice Advisory on Neurologic Complications");

    for (const resolvedGap of [
      "Нужен отдельный локальный алгоритм осложнений нейроаксиальной анестезии: высокий блок, тотальный спинальный блок, эпидуральная гематома, инфекция, задержка мочи, постпункционная головная боль.",
      "Нужен готовый лист наблюдения за нейроаксиальной/катетерной аналгезией: боль, моторика, чувствительность, место катетера, температура, признаки инфекции, `LAST`, суммарная доза ЛА.",
    ]) {
      expect(markdown).not.toContain(resolvedGap);
    }
  });

  it("keeps a 2026-05-09 wave 12 ledger and closes peripheral catheter safety gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 12 - peripheral block and catheter safety observation");
    expect(audit).toContain("ASRA 2025 deep plexus/deep peripheral");
    expect(audit).toContain("Protokol-peryoperatsijnogo-znebolennya.docx");
    expect(audit).toContain("`theme-05`");

    expect(markdown).toContain("Периферические блоки: compressible-site и anticoagulation decision");
    expect(markdown).toContain("Deep plexus/deep peripheral block | вести как нейроаксиальную технику");
    expect(markdown).toContain("Поверхностный compressible block | оценить возможность прямой компрессии");
    expect(markdown).toContain("Лист наблюдения за периферической катетерной аналгезией");
    expect(markdown).toContain("моторика и защита конечности | сила/движение");
    expect(markdown).toContain("суммарная доза ЛА | концентрация, скорость, bolus");
    expect(coverageMap).toContain("| `theme-05` | Partial, improved 2026-05-09 wave 12 |");
    expect(coverageMap).toContain("ASRA 2025 deep plexus/deep peripheral");

    for (const resolvedGap of [
      "Требует локального SOP: применить ASRA-таблицу из темы 4 к поверхностным compressible blocks и глубоким некомпрессируемым блокам, чтобы в назначении было видно, где нужен нейроаксиальный уровень осторожности.",
      "Нужен готовый лист наблюдения за периферической катетерной аналгезией: боль, моторика, чувствительность, место катетера, температура, признаки инфекции, `LAST`, суммарная доза ЛА.",
    ]) {
      expect(markdown).not.toContain(resolvedGap);
    }
  });

  it("keeps a 2026-05-09 wave 13 ledger and closes PACU discharge-failure escalation gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 13 - PACU recovery and failed-discharge escalation");
    expect(audit).toContain("ASA Standards for Postanesthesia Care 2024");
    expect(audit).toContain("Новий_клінічний_протокол_Седація_при_ЕФГДС_2025.docx");
    expect(audit).toContain("`theme-10`");

    expect(markdown).toContain("`PACU` - post-anesthesia care unit");
    expect(markdown).toContain("PACU: мониторинг, задержка выписки и эскалация");
    expect(markdown).toContain("handover в PACU | анестезиологическая команда передает");
    expect(markdown).toContain("Aldrete `<8`");
    expect(markdown).toContain("SpO2<90% несмотря на оксигенотерапию, апноэ");
    expect(markdown).toContain("налоксон/флумазенил");
    expect(markdown).toContain("не выписывать домой без сопровождающего");
    expect(markdown).toContain("запрет вождения и решений минимум `24 часа`");
    expect(coverageMap).toContain("| `theme-10` | Partial, improved 2026-05-09 wave 13 |");
    expect(coverageMap).toContain("ASA Standards for Postanesthesia Care 2024");

    expect(markdown).not.toContain("PACU discharge failure escalation");
  });

  it("keeps a 2026-05-09 wave 14 ledger and refreshes post-ROSC targets from MOH 1259", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 14 - CPR and post-ROSC source refresh");
    expect(audit).toContain("ГС 2024-1259-2");
    expect(audit).toContain("ГС 2024-1259-1");
    expect(audit).toContain("`theme-11`");

    expect(markdown).toContain("Post-ROSC: цели интенсивной терапии по МОЗ №1259");
    expect(markdown).toContain("оксигенация | избегать гипоксемии и гипероксии");
    expect(markdown).toContain("SaO2 `94-98%`, PaO2 `75-100 мм рт.ст.`");
    expect(markdown).toContain("PaCO2 `35-45 мм рт.ст.`");
    expect(markdown).toContain("дыхательный объем `6-8 мл/кг` идеальной массы тела");
    expect(markdown).toContain("MAP `>65 мм рт.ст.`");
    expect(markdown).toContain("диурез `>0,5 мл/кг/ч`");
    expect(markdown).toContain("не допускать гипертермии `>37,7 C` первые `72 часа`");
    expect(markdown).toContain("гликемия `7,8-10,0 ммоль/л`");
    expect(markdown).toContain("первичное `PCI` в пределах `120 минут`");
    expect(markdown).toContain("не назначать рутинно ГКС или профилактические противосудорожные препараты");
    expect(coverageMap).toContain("| `theme-11` | Covered for existing source material, refreshed 2026-05-09 wave 14 |");
    expect(coverageMap).toContain("MOH/DEC `ГС 2024-1259-1/-2` CPR standards");

    expect(markdown).not.toContain("ROSC source refresh");
  });

  it("keeps a 2026-05-09 wave 15 ledger and closes pulmonary embolism reperfusion gaps", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 15 - pulmonary embolism reperfusion and RV support");
    expect(audit).toContain("Клінічний протокол ТЕЛА 2025.docx");
    expect(audit).toContain("ESC/ERS 2019 pulmonary embolism guideline");
    expect(audit).toContain("`theme-13`");

    expect(markdown).toContain("ТЭЛА: стратификация, реперфузия и поддержка ПЖ");
    expect(markdown).toContain("сАД `<90 мм рт.ст.`");
    expect(markdown).toContain("снижение сАД `>=40 мм рт.ст.` `>=15 минут`");
    expect(markdown).toContain("альтеплаза `100 мг за 2 часа`");
    expect(markdown).toContain("ускоренный режим rtPA `0,6 мг/кг за 15 минут`, максимум `50 мг`");
    expect(markdown).toContain("не делать первичный full-dose thrombolysis рутинно");
    expect(markdown).toContain("эноксапарин `1 мг/кг 2 раза/сут`");
    expect(markdown).toContain("НФГ `80-100 ЕД/кг` болюс");
    expect(markdown).toContain("PEEP `<=8 см H2O`");
    expect(markdown).toContain("норадреналин `0,2-1,0 мкг/кг/мин`");
    expect(markdown).toContain("добутамин `2-20 мкг/кг/мин`");
    expect(coverageMap).toContain("| `theme-13` | Partial, improved 2026-05-09 wave 15 |");
    expect(coverageMap).toContain("PE reperfusion/RV-support table added");

    expect(markdown).not.toContain("pulmonary embolism reperfusion");
  });

  it("keeps a 2026-05-09 wave 16 ledger and adds component-dose guardrails", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 16 - blood component dose guardrails");
    expect(audit).toContain("NICE NG24 Blood transfusion");
    expect(audit).toContain("AABB 2023 RBC transfusion guideline");
    expect(audit).toContain("AABB/ICTMG 2025 platelet transfusion guideline");
    expect(audit).toContain("`theme-24`");

    expect(markdown).toContain("Компоненты крови: практические дозы и контроль эффекта");
    expect(markdown).toContain("ЭМ у взрослого без активного кровотечения | `1 доза`");
    expect(markdown).toContain("после каждой дозы - клиническая переоценка и Hb");
    expect(markdown).toContain("Тромбоциты | обычно `1 доза`");
    expect(markdown).toContain("не переливать больше одной дозы рутинно");
    expect(markdown).toContain("clinically significant bleeding");
    expect(markdown).toContain("тромбоциты `<30 x 10^9/л`");
    expect(markdown).toContain("critical site");
    expect(markdown).toContain("до `100 x 10^9/л`");
    expect(markdown).toContain("СЗП | фиксированную универсальную дозу не выводить из NICE");
    expect(markdown).toContain("ПЧ ratio/АЧТЧ ratio `>1,5`");
    expect(markdown).toContain("Криопреципитат | взрослым `2 pools`");
    expect(markdown).toContain("детям `5-10 мл/кг`, максимум `2 pools`");
    expect(markdown).toContain("фибриноген `<1,5 г/л`");
    expect(markdown).toContain("фибриноген `<1,0 г/л`");
    expect(markdown).toContain("фактический объем компонента ООКБ");
    expect(coverageMap).toContain("| `theme-24` | Partial, improved 2026-05-09 wave 16 |");
    expect(coverageMap).toContain("component-dose guardrails added");

    expect(markdown).not.toContain("blood component dose guardrails");
  });

  it("keeps a 2026-05-09 wave 17 ledger and adds pharmacology label-dose anchors", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 17 - anesthesia pharmacology label-dose anchors");
    expect(audit).toContain("DailyMed vecuronium bromide injection label");
    expect(audit).toContain("DailyMed cisatracurium besylate injection label");
    expect(audit).toContain("DailyMed neostigmine methylsulfate injection label");
    expect(audit).toContain("DailyMed fentanyl, morphine, and nalbuphine labels");
    expect(audit).toContain("`theme-22`");

    expect(markdown).toContain("Опиоиды и миорелаксанты: label-dose anchors");
    expect(markdown).toContain("Фентанил | adult start `50-100 мкг`");
    expect(markdown).toContain("Морфин | direct IV analgesia `0,1-0,2 мг/кг`");
    expect(markdown).toContain("Налбуфин | adult analgesia `10 мг` на `70 кг`");
    expect(markdown).toContain("Векуроний | интубационный bolus `0,08-0,1 мг/кг`");
    expect(markdown).toContain("maintenance `0,01-0,015 мг/кг`");
    expect(markdown).toContain("Цисатракурий | intubating bolus `0,15-0,2 мг/кг`");
    expect(markdown).toContain("инфузия сначала `3 мкг/кг/мин`, затем обычно `1-2 мкг/кг/мин`");
    expect(markdown).toContain("Неостигмин | reversal `0,03-0,07 мг/кг в/в`");
    expect(markdown).toContain("не превышать `0,07 мг/кг` или `5 мг`");
    expect(markdown).toContain("атропин примерно `15 мкг/кг` или гликопирролат примерно `10 мкг/кг`");
    expect(markdown).toContain("Трамадол оставить в теме боли/формуляра");
    expect(coverageMap).toContain("| `theme-22` | Partial, improved 2026-05-09 wave 17 |");
    expect(coverageMap).toContain("opioid/NMBA label-dose anchors added");

    expect(markdown).not.toContain("Дозы фентанила, морфина, налбуфина/трамадола, векурония, цисатракурия и неостигмина внести");
  });

  it("keeps a 2026-05-09 wave 18 ledger and adds Ca/Mg/P plus refeeding guardrails", () => {
    const auditPath = path.resolve(process.cwd(), "docs/gap-fill-audit-2026-05-07.md");

    expect(fs.existsSync(auditPath)).toBe(true);

    const audit = fs.readFileSync(auditPath, "utf8");
    const markdown = fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8");
    const coverageMap = fs.readFileSync("docs/curriculum-coverage-map.md", "utf8");

    expect(audit).toContain("Wave 18 - calcium magnesium phosphate and refeeding");
    expect(audit).toContain("NICE CG32 Nutrition support for adults");
    expect(audit).toContain("Merck Manual Professional hypocalcemia, hypomagnesemia and hypophosphatemia chapters");
    expect(audit).toContain("Endocrine Society 2022 hypercalcemia of malignancy guideline");
    expect(audit).toContain("`theme-18`");

    expect(markdown).toContain("Ca/Mg/P и refeeding: практический ОИТ-контроль");
    expect(markdown).toContain("BMI `<16 кг/м2`");
    expect(markdown).toContain("little/no intake `>10 дней`");
    expect(markdown).toContain("nutrition support максимум `10 ккал/кг/сут`");
    expect(markdown).toContain("экстремальный риск `5 ккал/кг/сут`");
    expect(markdown).toContain("тиамин `200-300 мг/сут`");
    expect(markdown).toContain("K `2-4 ммоль/кг/сут`, phosphate `0,3-0,6 ммоль/кг/сут`, Mg `0,2 ммоль/кг/сут в/в`");
    expect(markdown).toContain("Гипокальциемия с тетанией/аритмией | кальций в/в и поиск причины | calcium gluconate `10%` `10 мл в/в за 10 минут`");
    expect(markdown).toContain("Гипомагниемия тяжелая/симптомная | magnesium sulfate в/в | magnesium sulfate `2-4 г в/в за 5-10 минут`");
    expect(markdown).toContain("Гипофосфатемия тяжелая `<1 мг/дл` (`<0,32 ммоль/л`) или симптомная");
    expect(markdown).toContain("Гиперкальциемия malignancy severe `>14 мг/дл` (`>3,5 ммоль/л`)");
    expect(coverageMap).toContain("| `theme-18` | Partial, improved 2026-05-09 wave 18 |");
    expect(coverageMap).toContain("Ca/Mg/P and refeeding guardrails added");

    expect(markdown).not.toContain("отдельные схемы коррекции `Ca`, `Mg`, `P` и рефидинга");
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
