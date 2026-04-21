import fs from "node:fs";
import { describe, expect, it } from "vitest";

import { parseStudyMarkdown } from "../src/lib/content/parser";
import { SOURCE_MARKDOWN_PATH } from "../src/lib/content/paths";

describe("parseStudyMarkdown", () => {
  const parsed = parseStudyMarkdown(fs.readFileSync(SOURCE_MARKDOWN_PATH, "utf8"));

  it("creates Krok-aligned website sections without the unused normative map", () => {
    expect(parsed.themes).toHaveLength(27);
    expect(parsed.themes.filter((theme) => theme.themeKey.startsWith("theme-"))).toHaveLength(25);
    expect(parsed.themes[0].title).toBe("Как пользоваться конспектом");
    expect(parsed.themes.some((theme) => theme.title.includes("Нормативная карта экзамена"))).toBe(false);
    expect(parsed.themes[26].title).toBe("Быстрое финальное повторение и тестовые акценты");
  });

  it("removes source numbers from theme display titles", () => {
    expect(parsed.themes.map((theme) => theme.title)).not.toContain("4. Нутритивная поддержка");
    expect(parsed.themes.find((theme) => theme.themeKey === "theme-04")?.title).toBe(
      "Регионарная и нейроаксиальная анестезия",
    );
    expect(parsed.themes.find((theme) => theme.themeKey === "theme-05")?.title).toBe(
      "Периферические и фасциальные блокады",
    );
    expect(parsed.themes.find((theme) => theme.themeKey === "theme-06")?.title).toBe(
      "Акушерская анестезия и акушерские критические состояния",
    );
    expect(parsed.themes.every((theme) => !/^\d+\./.test(theme.title))).toBe(true);
  });

  it("removes legacy numbering from nested clinical headings", () => {
    const nestedHeadings = parsed.themes.flatMap((theme) =>
      theme.blocks.filter((block) => block.kind === "heading").map((block) => block.text),
    );

    expect(nestedHeadings).toContain("СЛР у взрослых и детей — приказ МОЗ №1259 от 18.07.2024");
    expect(nestedHeadings).toContain("STEMI — приказ МОЗ №1936 от 14.09.2021");
    expect(nestedHeadings).toContain("Красные цифры");
    expect(nestedHeadings.some((heading) => /^(Перенесенный материал:\s*)?\d+\./.test(heading))).toBe(false);
    expect(nestedHeadings.some((heading) => heading.startsWith("Перенесенный материал:"))).toBe(false);
  });

  it("preserves stable ordering and block keys", () => {
    const preopTheme = parsed.themes.find((theme) => theme.themeKey === "theme-01");

    expect(preopTheme?.sortOrder).toBe(3);
    expect(preopTheme?.blocks[0].blockKey).toBe("theme-01-001");
    expect(preopTheme?.blocks[0].kind).toBe("heading");
    expect(preopTheme?.blocks[0].text).toBe("Ключевые акценты");
  });

  it("keeps reader-facing frame headings useful and moves Krok codes out of source", () => {
    const requiredHeadings = [
      "Ключевые акценты",
      "Практический алгоритм",
      "Красные цифры/пороговые значения",
      "Источники и спорные места",
      "Пробелы к заполнению",
    ];

    for (const theme of parsed.themes.filter((item) => item.themeKey.startsWith("theme-"))) {
      const headings = theme.blocks
        .filter((block) => block.kind === "heading")
        .map((block) => block.text);

      expect(headings).toEqual(expect.arrayContaining(requiredHeadings));
      expect(headings).not.toContain("Покрывает коды Крок 3");
      expect(headings).not.toContain("Что обязан проговорить на экзамене");
      expect(headings.at(-1)).toBe("Пробелы к заполнению");
    }

    const sourceText = parsed.themes
      .flatMap((theme) => [theme.title, ...theme.blocks.map((block) => block.text)])
      .join("\n");

    expect(sourceText).not.toMatch(/\b[1-6]\.\d+\.\d+\.\d+\b/);
    expect(sourceText).not.toMatch(/экзамен|экзаменац|устн/i);
  });

  it("preserves representative legacy topics inside the new Krok modules", () => {
    const sourceText = parsed.themes
      .flatMap((theme) => [theme.title, ...theme.blocks.map((block) => block.text)])
      .join("\n");

    for (const topic of [
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
      "Регионарная и нейроаксиальная анестезия",
      "Периферические и фасциальные блокады",
      "Акушерская анестезия и акушерские критические состояния",
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
    ]) {
      expect(sourceText).toContain(topic);
    }
  });

  it("keeps acid-base disorders as separate reader-facing sections", () => {
    const sourceText = parsed.themes
      .flatMap((theme) => [theme.title, ...theme.blocks.map((block) => block.text)])
      .join("\n");

    for (const phrase of [
      "КОС: пошаговая интерпретация",
      "Метаболический ацидоз",
      "Метаболический алкалоз",
      "Респираторный ацидоз",
      "Респираторный алкалоз",
      "Смешанные нарушения КОС",
      "формула Winter",
      "дельта-разница",
    ]) {
      expect(sourceText).toContain(phrase);
    }
  });

  it("adds dedicated modules for safety, pharmacology, toxicology, and transfusion", () => {
    expect(parsed.themes.find((theme) => theme.themeKey === "theme-11")?.title).toBe(
      "СЛР, ALS/PALS и post-ROSC",
    );
    expect(parsed.themes.find((theme) => theme.themeKey === "theme-12")?.title).toBe(
      "Периоперационные критические инциденты и анафилаксия",
    );
    expect(parsed.themes.find((theme) => theme.themeKey === "theme-20")?.title).toBe(
      "Операционная безопасность и контрольный список анестезии",
    );
    expect(parsed.themes.find((theme) => theme.themeKey === "theme-21")?.title).toBe(
      "Местные анестетики и системная токсичность",
    );
    expect(parsed.themes.find((theme) => theme.themeKey === "theme-22")?.title).toBe(
      "Фармакология анестезии: анестетики, опиоиды и миорелаксанты",
    );
    expect(parsed.themes.find((theme) => theme.themeKey === "theme-23")?.title).toBe(
      "Токсикология и острые отравления",
    );
    expect(parsed.themes.find((theme) => theme.themeKey === "theme-24")?.title).toBe(
      "Трансфузиология и компоненты крови",
    );
    expect(parsed.themes.find((theme) => theme.themeKey === "theme-25")?.title).toBe(
      "Быстрое финальное повторение и тестовые акценты",
    );
  });

  it("keeps technical update details out of reader source content", () => {
    const sourceText = parsed.themes
      .flatMap((theme) => [theme.title, ...theme.blocks.map((block) => block.text)])
      .join("\n");

    for (const term of [
      "MCP",
      "Supabase",
      "sourcePath",
      "content:export",
      "source:verify",
      "revalidate",
      "REVALIDATE_SECRET",
      "tmp-study-project",
      "/Users/qinastha",
      "Источниковая база и материалы для сверки",
    ]) {
      expect(sourceText).not.toContain(term);
    }
  });

  it("uses website-specific guide copy", () => {
    const guide = parsed.themes[0];

    expect(guide.themeKey).toBe("guide");
    expect(guide.blocks.map((block) => block.text)).toEqual([
      "Этот сайт заменяет простой PDF: темы читаются по одной или одним длинным списком, а комментарии привязаны к конкретной теме или абзацу.",
      "Фокус конспекта - госпитальный этап АИТ: от приемного отделения, операционной и ОИТ до профильного отделения, диагностического кабинета или внутрибольничного транспорта; догоспитальную сортировку не разбираем.",
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
