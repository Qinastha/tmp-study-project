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
    expect(payload.themes).toHaveLength(27);
    expect(payload.themes.find((theme: { themeKey: string }) => theme.themeKey === "theme-04")?.title).toBe(
      "Регионарная и нейроаксиальная анестезия",
    );
    expect(payload.themes.find((theme: { themeKey: string }) => theme.themeKey === "theme-05")?.title).toBe(
      "Периферические и фасциальные блокады",
    );
    expect(payload.themes.find((theme: { themeKey: string }) => theme.themeKey === "theme-06")?.title).toBe(
      "Акушерская анестезия и акушерские критические состояния",
    );
    expect(payload.themes.find((theme: { themeKey: string }) => theme.themeKey === "theme-11")?.title).toBe(
      "СЛР, ALS/PALS и post-ROSC",
    );
    expect(payload.themes.find((theme: { themeKey: string }) => theme.themeKey === "theme-12")?.title).toBe(
      "Периоперационные критические инциденты и анафилаксия",
    );
    expect(payload.themes.find((theme: { themeKey: string }) => theme.themeKey === "theme-21")?.title).toBe(
      "Местные анестетики и системная токсичность",
    );
    expect(payload.themes.find((theme: { themeKey: string }) => theme.themeKey === "theme-24")?.title).toBe(
      "Трансфузиология и компоненты крови",
    );
    expect(payload.themes.find((theme: { themeKey: string }) => theme.themeKey === "theme-25")?.title).toBe(
      "Быстрое финальное повторение и тестовые акценты",
    );
    expect(JSON.stringify(payload)).not.toContain("Покрывает коды Крок 3");
    expect(JSON.stringify(payload)).not.toMatch(/\b[1-6]\.\d+\.\d+\.\d+\b/);
    expect(JSON.stringify(payload)).not.toMatch(/экзамен|экзаменац|устн/i);
  });
});
