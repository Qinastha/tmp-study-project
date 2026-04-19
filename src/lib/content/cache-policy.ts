export const CONTENT_CACHE_TAG = "study-reader-content";
export const COMMENTS_CACHE_TAG = "study-reader-comments";

export const CONTENT_CACHE_REVALIDATE_SECONDS = 60 * 60 * 24;
export const COMMENTS_CACHE_REVALIDATE_SECONDS = 60 * 60 * 24;

export function getThemeCommentsCacheTag(themeId: string) {
  return `${COMMENTS_CACHE_TAG}:theme:${themeId}`;
}
