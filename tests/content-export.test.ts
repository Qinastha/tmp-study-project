import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("content export payload", () => {
  it("is Markdown-only", () => {
    execFileSync("npm", ["run", "content:export"], { stdio: "pipe" });
    const payload = JSON.parse(fs.readFileSync("tmp/study-content-payload.json", "utf8"));

    expect(payload.sourceDocument.sourcePath).toBe("content/source.md");
    expect(payload.sourceDocument.sourceSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(payload.sourceDocument.contentSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(payload.sourceDocument).not.toHaveProperty("pdfSha256");
    expect(payload.sourceDocument).not.toHaveProperty("pageCount");
    expect(payload.themes).toHaveLength(19);
    expect(payload.themes.find((theme: { themeKey: string }) => theme.themeKey === "theme-04")?.title).toBe(
      "Нутритивная поддержка",
    );
  });
});
