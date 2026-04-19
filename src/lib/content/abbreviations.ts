export interface AbbreviationDefinition {
  term: string;
  definition: string;
}

export type AbbreviatedTextPart =
  | { type: "text"; text: string }
  | { type: "abbr"; text: string; definition: AbbreviationDefinition };

interface ThemeLike {
  themeKey?: string;
  theme_key?: string;
  title: string;
  blocks: Array<{ text: string }>;
}

const TOKEN_BOUNDARY = String.raw`[\p{L}\p{N}_]`;

export function extractAbbreviations(themes: ThemeLike[]): AbbreviationDefinition[] {
  const dictionaryTheme = themes.find(
    (theme) => theme.themeKey === "abbreviations" || theme.theme_key === "abbreviations",
  );

  if (!dictionaryTheme) {
    return [];
  }

  const byTerm = new Map<string, AbbreviationDefinition>();

  for (const block of dictionaryTheme.blocks) {
    const parsed = parseDictionaryLine(block.text);
    if (!parsed) {
      continue;
    }

    for (const term of parsed.terms) {
      if (!byTerm.has(term)) {
        byTerm.set(term, { term, definition: parsed.definition });
      }
    }
  }

  return [...byTerm.values()].sort((a, b) => b.term.length - a.term.length || a.term.localeCompare(b.term));
}

export function splitTextByAbbreviations(
  text: string,
  definitions: AbbreviationDefinition[],
): AbbreviatedTextPart[] {
  if (!text || definitions.length === 0) {
    return [{ type: "text", text }];
  }

  const definitionsByTerm = new Map(definitions.map((definition) => [definition.term, definition]));
  const alternatives = [...definitionsByTerm.keys()]
    .sort((a, b) => b.length - a.length || a.localeCompare(b))
    .map(escapeRegExp)
    .join("|");

  if (!alternatives) {
    return [{ type: "text", text }];
  }

  const matcher = new RegExp(`(^|[^${TOKEN_BOUNDARY.slice(1, -1)}])(${alternatives})(?=$|[^${TOKEN_BOUNDARY.slice(1, -1)}])`, "gu");
  const parts: AbbreviatedTextPart[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(text))) {
    const prefix = match[1] ?? "";
    const term = match[2];
    const termStart = match.index + prefix.length;
    const termEnd = termStart + term.length;
    const definition = definitionsByTerm.get(term);

    if (!definition) {
      continue;
    }

    const wrappedInBackticks = prefix === "`" && text[termEnd] === "`";
    const textEnd = wrappedInBackticks ? match.index : termStart;
    const nextCursor = wrappedInBackticks ? termEnd + 1 : termEnd;

    if (textEnd > cursor) {
      parts.push({ type: "text", text: text.slice(cursor, textEnd) });
    }

    parts.push({ type: "abbr", text: term, definition });
    cursor = nextCursor;
    matcher.lastIndex = nextCursor;
  }

  if (cursor < text.length) {
    parts.push({ type: "text", text: text.slice(cursor) });
  }

  return parts.length > 0 ? parts : [{ type: "text", text }];
}

function parseDictionaryLine(text: string) {
  const match = text.match(/^(.+?)\s+-\s+(.+)$/);
  if (!match) {
    return null;
  }

  const terms = match[1]
    .replace(/`/g, "")
    .split(/\s+или\s+/i)
    .map((term) => term.trim())
    .filter(Boolean);

  if (terms.length === 0) {
    return null;
  }

  return {
    terms,
    definition: cleanDictionaryText(match[2]),
  };
}

function cleanDictionaryText(text: string) {
  return text.replace(/`/g, "").replace(/\s+/g, " ").trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
