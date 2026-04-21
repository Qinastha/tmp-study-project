import { unstable_cache } from "next/cache";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import {
  COMMENTS_CACHE_REVALIDATE_SECONDS,
  COMMENTS_CACHE_TAG,
  CONTENT_CACHE_REVALIDATE_SECONDS,
  CONTENT_CACHE_TAG,
  getThemeCommentsCacheTag,
} from "@/lib/content/cache-policy";
import type { Database } from "@/types/database";
import type { CommentRow, ContentBlockRow, ThemeRow } from "@/types/database";

export interface ReaderTheme extends ThemeRow {
  blocks: ContentBlockRow[];
  comments: CommentRow[];
}

export interface ReaderData {
  themes: ReaderTheme[];
  error: string | null;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const CONTENT_BLOCK_PAGE_SIZE = 1000;

function createPublicSupabaseClient() {
  return createSupabaseClient<Database>(supabaseUrl!, supabaseKey!, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

const getCachedReaderContent = unstable_cache(
  async () => {
    const supabase = createPublicSupabaseClient();

    const { data: themes, error: themeError } = await supabase
      .from("themes")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (themeError) {
      throw new Error(themeError.message);
    }

    if (!themes || themes.length === 0) {
      return [];
    }

    const themeIds = themes.map((theme) => theme.id);
    const blocks = await fetchActiveContentBlocks(supabase, themeIds);

    const blocksByThemeId = groupByThemeId(blocks);

    return themes.map((theme) => ({
      ...theme,
      blocks: blocksByThemeId.get(theme.id) ?? [],
      comments: [],
    })) satisfies ReaderTheme[];
  },
  ["study-reader-active-content", "paged-blocks-v2"],
  {
    revalidate: CONTENT_CACHE_REVALIDATE_SECONDS,
    tags: [CONTENT_CACHE_TAG],
  },
);

function getCachedVisibleCommentsForTheme(themeId: string) {
  return unstable_cache(
    async () => {
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("theme_id", themeId)
        .eq("status", "visible")
        .order("created_at", { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },
    ["study-reader-visible-comments", themeId],
    {
      revalidate: COMMENTS_CACHE_REVALIDATE_SECONDS,
      tags: [COMMENTS_CACHE_TAG, getThemeCommentsCacheTag(themeId)],
    },
  )();
}

export async function getReaderData(): Promise<ReaderData> {
  try {
    const themes = await getCachedReaderContent();

    if (themes.length === 0) {
      return { themes: [], error: null };
    }

    const comments = await getVisibleComments(themes.map((theme) => theme.id));

    return {
      themes: attachComments(themes, comments),
      error: null,
    };
  } catch (error) {
    return {
      themes: [],
      error: error instanceof Error ? error.message : "Failed to load reader data.",
    };
  }
}

export async function getSingleTheme(slug: string) {
  try {
    const themes = await getCachedReaderContent();

    if (themes.length === 0) {
      return {
        themes: [],
        error: null,
        theme: null,
        previousTheme: null,
        nextTheme: null,
      };
    }

    const index = themes.findIndex((theme) => theme.slug === slug);
    const theme = index >= 0 ? themes[index] : null;

    if (!theme) {
      return {
        themes,
        error: null,
        theme: null,
        previousTheme: null,
        nextTheme: null,
      };
    }

    const comments = await getVisibleComments([theme.id]);

    const themesWithComments = attachComments(themes, comments);

    return {
      themes: themesWithComments,
      error: null,
      theme: themesWithComments[index],
      previousTheme: index > 0 ? themesWithComments[index - 1] : null,
      nextTheme: index >= 0 && index < themesWithComments.length - 1 ? themesWithComments[index + 1] : null,
    };
  } catch (error) {
    return {
      themes: [],
      error: error instanceof Error ? error.message : "Failed to load reader data.",
      theme: null,
      previousTheme: null,
      nextTheme: null,
    };
  }
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

async function getVisibleComments(themeIds: string[]) {
  if (themeIds.length === 0) {
    return [];
  }

  const settledComments = await Promise.allSettled(
    normalizeThemeIds(themeIds).map((themeId) => getCachedVisibleCommentsForTheme(themeId)),
  );

  return settledComments.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
}

async function fetchActiveContentBlocks(
  supabase: ReturnType<typeof createPublicSupabaseClient>,
  themeIds: string[],
) {
  const blocks: ContentBlockRow[] = [];

  for (let from = 0; ; from += CONTENT_BLOCK_PAGE_SIZE) {
    const to = from + CONTENT_BLOCK_PAGE_SIZE - 1;
    const { data, error } = await supabase
      .from("theme_content_blocks")
      .select("*")
      .in("theme_id", themeIds)
      .eq("is_active", true)
      .order("theme_id", { ascending: true })
      .order("sort_order", { ascending: true })
      .range(from, to);

    if (error) {
      throw new Error(error.message);
    }

    blocks.push(...(data ?? []));

    if (!data || data.length < CONTENT_BLOCK_PAGE_SIZE) {
      return blocks;
    }
  }
}

function normalizeThemeIds(themeIds: string[]) {
  return [...new Set(themeIds)].sort();
}

function groupByThemeId(blocks: ContentBlockRow[]) {
  const blocksByThemeId = new Map<string, ContentBlockRow[]>();

  for (const block of blocks) {
    const themeBlocks = blocksByThemeId.get(block.theme_id) ?? [];
    themeBlocks.push(block);
    blocksByThemeId.set(block.theme_id, themeBlocks);
  }

  return blocksByThemeId;
}

function attachComments(themes: ReaderTheme[], comments: CommentRow[]) {
  const commentsByThemeId = groupCommentsByThemeId(comments);

  return themes.map((theme) => ({
    ...theme,
    comments: commentsByThemeId.get(theme.id) ?? [],
  }));
}

function groupCommentsByThemeId(comments: CommentRow[]) {
  const commentsByThemeId = new Map<string, CommentRow[]>();

  for (const comment of comments) {
    const themeComments = commentsByThemeId.get(comment.theme_id) ?? [];
    themeComments.push(comment);
    commentsByThemeId.set(comment.theme_id, themeComments);
  }

  return commentsByThemeId;
}
