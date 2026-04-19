import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "../src/app/api/revalidate/route";
import { COMMENTS_CACHE_TAG, CONTENT_CACHE_TAG } from "../src/lib/content/cache-policy";

const { revalidatePathMock, revalidateTagMock } = vi.hoisted(() => ({
  revalidatePathMock: vi.fn(),
  revalidateTagMock: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
  revalidateTag: revalidateTagMock,
}));

describe("revalidate endpoint", () => {
  beforeEach(() => {
    process.env.REVALIDATE_SECRET = "test-secret";
    revalidatePathMock.mockClear();
    revalidateTagMock.mockClear();
  });

  afterEach(() => {
    delete process.env.REVALIDATE_SECRET;
  });

  it("rejects requests without the configured secret", async () => {
    const response = await POST(
      new Request("https://tmp-study-project.vercel.app/api/revalidate", {
        method: "POST",
      }),
    );

    expect(response.status).toBe(401);
    expect(revalidateTagMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("purges long-lived content and comment caches for MCP pushes", async () => {
    const response = await POST(
      new Request("https://tmp-study-project.vercel.app/api/revalidate", {
        method: "POST",
        headers: {
          "x-revalidate-secret": "test-secret",
        },
      }),
    );

    expect(response.status).toBe(200);
    expect(revalidateTagMock).toHaveBeenCalledWith(CONTENT_CACHE_TAG, { expire: 0 });
    expect(revalidateTagMock).toHaveBeenCalledWith(COMMENTS_CACHE_TAG, { expire: 0 });
    expect(revalidatePathMock).toHaveBeenCalledWith("/themes");
    expect(revalidatePathMock).toHaveBeenCalledWith("/themes/[slug]", "page");
  });
});
