import { describe, expect, it } from "vitest";

import {
  COMMENTS_CACHE_REVALIDATE_SECONDS,
  COMMENTS_CACHE_TAG,
  CONTENT_CACHE_REVALIDATE_SECONDS,
  getThemeCommentsCacheTag,
} from "../src/lib/content/cache-policy";

describe("reader cache policy", () => {
  it("uses long-lived caches backed by explicit invalidation", () => {
    expect(CONTENT_CACHE_REVALIDATE_SECONDS).toBe(60 * 60 * 24);
    expect(COMMENTS_CACHE_REVALIDATE_SECONDS).toBe(60 * 60 * 24);
  });

  it("uses targetable per-theme comment cache tags", () => {
    expect(getThemeCommentsCacheTag("theme-id")).toBe(
      `${COMMENTS_CACHE_TAG}:theme:theme-id`,
    );
  });
});
