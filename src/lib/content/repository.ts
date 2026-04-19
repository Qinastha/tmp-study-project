import { unstable_noStore as noStore } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { CommentRow, ContentBlockRow, ThemeRow } from "@/types/database";

export interface ReaderTheme extends ThemeRow {
  blocks: ContentBlockRow[];
  comments: CommentRow[];
}

export interface ReaderData {
  themes: ReaderTheme[];
  error: string | null;
}

export async function getReaderData(): Promise<ReaderData> {
  noStore();
  const supabase = await createClient();

  const { data: themes, error: themeError } = await supabase
    .from("themes")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (themeError) {
    return { themes: [], error: themeError.message };
  }

  if (!themes || themes.length === 0) {
    return { themes: [], error: null };
  }

  const themeIds = themes.map((theme) => theme.id);

  const [{ data: blocks, error: blockError }, { data: comments, error: commentError }] =
    await Promise.all([
      supabase
        .from("theme_content_blocks")
        .select("*")
        .in("theme_id", themeIds)
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
      supabase
        .from("comments")
        .select("*")
        .in("theme_id", themeIds)
        .eq("status", "visible")
        .order("created_at", { ascending: true }),
    ]);

  if (blockError || commentError) {
    return {
      themes: [],
      error: blockError?.message ?? commentError?.message ?? "Failed to load reader data.",
    };
  }

  return {
    themes: themes.map((theme) => ({
      ...theme,
      blocks: (blocks ?? []).filter((block) => block.theme_id === theme.id),
      comments: (comments ?? []).filter((comment) => comment.theme_id === theme.id),
    })),
    error: null,
  };
}

export async function getSingleTheme(slug: string) {
  const data = await getReaderData();

  if (data.error || data.themes.length === 0) {
    return {
      ...data,
      theme: null,
      previousTheme: null,
      nextTheme: null,
    };
  }

  const index = data.themes.findIndex((theme) => theme.slug === slug);
  const theme = index >= 0 ? data.themes[index] : null;

  return {
    ...data,
    theme,
    previousTheme: index > 0 ? data.themes[index - 1] : null,
    nextTheme: index >= 0 && index < data.themes.length - 1 ? data.themes[index + 1] : null,
  };
}

export function countComments(
  comments: CommentRow[],
  target: { themeId: string; blockId?: string | null },
) {
  return comments.filter((comment) => {
    if (target.blockId) {
      return comment.theme_content_block_id === target.blockId;
    }

    return comment.theme_id === target.themeId && comment.theme_content_block_id === null;
  }).length;
}
