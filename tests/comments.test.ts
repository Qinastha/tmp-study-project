import { describe, expect, it } from "vitest";

import { validateCommentPayload } from "../src/lib/validation/comments";

const themeId = "11111111-1111-4111-8111-111111111111";
const blockId = "22222222-2222-4222-8222-222222222222";

describe("comment validation", () => {
  it("accepts a theme comment", () => {
    const result = validateCommentPayload({
      themeId,
      contentBlockId: null,
      targetType: "theme",
      authorName: "Максим",
      body: "Полезное уточнение.",
    });

    expect(result.success).toBe(true);
  });

  it("accepts a block comment", () => {
    const result = validateCommentPayload({
      themeId,
      contentBlockId: blockId,
      targetType: "block",
      authorName: "Олена",
      body: "Это видно и в общем режиме.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a block comment without block id", () => {
    const result = validateCommentPayload({
      themeId,
      contentBlockId: null,
      targetType: "block",
      authorName: "Олена",
      body: "Текст",
    });

    expect(result.success).toBe(false);
  });

  it("rejects empty user-facing fields", () => {
    const result = validateCommentPayload({
      themeId,
      contentBlockId: null,
      targetType: "theme",
      authorName: "",
      body: "",
    });

    expect(result.success).toBe(false);
  });
});
