import { createHash } from "node:crypto";

export type BlockKind = "heading" | "paragraph" | "bullet";

export interface ParsedDocument {
  title: string;
  revisionDate: string | null;
  language: string | null;
  basis: string | null;
  contentHash: string;
  themes: ParsedTheme[];
}

export interface ParsedTheme {
  themeKey: string;
  slug: string;
  title: string;
  sortOrder: number;
  contentHash: string;
  blocks: ParsedBlock[];
}

export interface ParsedBlock {
  blockKey: string;
  kind: BlockKind;
  headingLevel: number | null;
  text: string;
  sortOrder: number;
  contentHash: string;
}

const CYRILLIC_MAP: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  ґ: "g",
  д: "d",
  е: "e",
  ё: "e",
  є: "ie",
  ж: "zh",
  з: "z",
  и: "i",
  і: "i",
  ї: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

export function sha256(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

export function slugify(input: string): string {
  const transliterated = input
    .toLowerCase()
    .split("")
    .map((char) => CYRILLIC_MAP[char] ?? char)
    .join("");

  return (
    transliterated
      .replace(/№/g, "no")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-")
      .slice(0, 80) || "theme"
  );
}

export function parseStudyMarkdown(markdown: string): ParsedDocument {
  const normalized = markdown.replace(/\u00a0/g, " ").replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const title =
    lines.find((line) => line.trim().startsWith("# "))?.trim().slice(2).trim() ??
    "АИТ";

  const metadata = parseMetadata(lines);
  const themes: MutableTheme[] = [];
  let currentTheme: MutableTheme | null = null;
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (!currentTheme || paragraphBuffer.length === 0) {
      paragraphBuffer = [];
      return;
    }

    const text = normalizeText(paragraphBuffer.join(" "));
    paragraphBuffer = [];
    if (text) {
      currentTheme.blocks.push(makeBlock(currentTheme, "paragraph", null, text));
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const stripped = line.trim();

    if (!stripped) {
      flushParagraph();
      continue;
    }

    if (stripped.startsWith("# ")) {
      continue;
    }

    if (stripped.startsWith("## ")) {
      flushParagraph();
      const rawTitle = stripped.slice(3).trim();
      const themeMeta = getThemeMeta(rawTitle, themes.length + 1);
      if (!themeMeta) {
        currentTheme = null;
        continue;
      }

      currentTheme = {
        themeKey: themeMeta.themeKey,
        slug: uniqueSlug(themeMeta.slug, themes),
        title: themeMeta.title,
        sortOrder: themes.length + 1,
        blocks: [],
      };
      themes.push(currentTheme);
      continue;
    }

    if (!currentTheme) {
      continue;
    }

    if (stripped.startsWith("### ")) {
      flushParagraph();
      currentTheme.blocks.push(
        makeBlock(currentTheme, "heading", 3, stripped.slice(4).trim()),
      );
      continue;
    }

    if (stripped.startsWith("- ")) {
      flushParagraph();
      currentTheme.blocks.push(makeBlock(currentTheme, "bullet", null, stripped.slice(2).trim()));
      continue;
    }

    paragraphBuffer.push(stripped);
  }

  flushParagraph();

  const finalizedThemes = themes.map((theme) => ({
    ...theme,
    contentHash: sha256(theme.blocks.map((block) => block.contentHash).join(":")),
  }));

  return {
    title,
    revisionDate: metadata.revisionDate,
    language: metadata.language,
    basis: metadata.basis,
    contentHash: sha256(normalized),
    themes: finalizedThemes,
  };
}

interface MutableTheme {
  themeKey: string;
  slug: string;
  title: string;
  sortOrder: number;
  blocks: ParsedBlock[];
}

function makeBlock(
  theme: MutableTheme,
  kind: BlockKind,
  headingLevel: number | null,
  text: string,
): ParsedBlock {
  const sortOrder = theme.blocks.length + 1;
  const normalizedText = normalizeText(text);

  return {
    blockKey: `${theme.themeKey}-${String(sortOrder).padStart(3, "0")}`,
    kind,
    headingLevel,
    text: normalizedText,
    sortOrder,
    contentHash: sha256(`${kind}:${headingLevel ?? ""}:${normalizedText}`),
  };
}

interface ThemeMeta {
  themeKey: string;
  slug: string;
  title: string;
}

function getThemeMeta(rawTitle: string, sourceIndex: number): ThemeMeta | null {
  if (/^1\.\s*Нормативная карта экзамена/.test(rawTitle)) {
    return null;
  }

  if (rawTitle === "Как пользоваться конспектом") {
    return {
      themeKey: "guide",
      slug: "kak-polzovatsya-konspektom",
      title: rawTitle,
    };
  }

  if (rawTitle === "Словарь аббревиатур") {
    return {
      themeKey: "abbreviations",
      slug: "slovar-abbreviatur",
      title: rawTitle,
    };
  }

  const numbered = rawTitle.match(/^(\d+)\.\s*(.+)$/);
  if (numbered) {
    const sourceNumber = Number(numbered[1]);
    const title = numbered[2].trim();
    return {
      themeKey: `theme-${String(sourceNumber).padStart(2, "0")}`,
      slug: slugify(title),
      title,
    };
  }

  return {
    themeKey: `section-${String(sourceIndex).padStart(2, "0")}`,
    slug: slugify(rawTitle),
    title: rawTitle,
  };
}

function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function parseMetadata(lines: string[]) {
  const revision = lines.find((line) => line.trim().startsWith("Редакция:"));
  const language = lines.find((line) => line.trim().startsWith("Язык:"));
  const basis = lines.find((line) => line.trim().startsWith("Основа:"));

  return {
    revisionDate: parseRussianDate(revision?.split(":").slice(1).join(":").trim()),
    language: language?.split(":").slice(1).join(":").trim() ?? null,
    basis: basis?.split(":").slice(1).join(":").trim() ?? null,
  };
}

function parseRussianDate(value: string | undefined): string | null {
  if (!value) {
    return null;
  }

  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) {
    return null;
  }

  return `${match[3]}-${match[2]}-${match[1]}`;
}

function uniqueSlug(base: string, themes: MutableTheme[]): string {
  const existing = new Set(themes.map((theme) => theme.slug));
  if (!existing.has(base)) {
    return base;
  }

  let suffix = 2;
  while (existing.has(`${base}-${suffix}`)) {
    suffix += 1;
  }

  return `${base}-${suffix}`;
}
