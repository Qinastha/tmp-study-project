import { expect, test } from "@playwright/test";

let browserProblems: string[] = [];

test.beforeEach(async ({ page }) => {
  browserProblems = [];

  page.on("console", (message) => {
    const text = message.text();
    const isRelevant =
      message.type() === "error" ||
      text.includes("Hydration failed") ||
      text.includes("Encountered a script tag");

    if (isRelevant) {
      browserProblems.push(`[browser:${message.type()}] ${text}`);
    }
  });

  page.on("pageerror", (error) => {
    browserProblems.push(`[pageerror] ${error.message}`);
  });
});

test.afterEach(() => {
  expect(browserProblems).toEqual([]);
});

test("reader shell loads", async ({ page }) => {
  await page.goto("/themes");
  await expect(page.getByText(/АИТ/).first()).toBeVisible();
});

test("theme switcher is available", async ({ page }) => {
  await page.goto("/themes");
  await page.getByLabel("Переключить тему").click();
  await expect(page.getByRole("menuitem", { name: "Темная", exact: true })).toBeVisible();
});

test("seeded reader supports navigation and comments", async ({ page }) => {
  test.skip(!process.env.E2E_SUPABASE_READY, "Requires migrated and seeded Supabase project.");

  await page.goto("/themes");
  await expect(page.getByText(/\d+ тем/)).toBeVisible();
  await expect(page.getByText("1750 блоков")).toBeVisible();
  await page.getByLabel("Комментарии к теме").first().click();
  await expect(page.getByText("Комментарии", { exact: true })).toBeVisible();
});

test("theme titles do not repeat source numbering", async ({ page }) => {
  test.skip(!process.env.E2E_SUPABASE_READY, "Requires migrated and seeded Supabase project.");

  await page.goto("/themes");
  await expect(page.getByRole("heading", { name: "Как пользоваться конспектом", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "4. Нутритивная поддержка" })).toHaveCount(0);
  await expect(page.getByText("Нормативная карта экзамена")).toHaveCount(0);
});

test("block comment affordance remains visible on mobile and desktop", async ({ page }) => {
  test.skip(!process.env.E2E_SUPABASE_READY, "Requires migrated and seeded Supabase project.");

  await page.goto("/themes");
  await expect(page.getByLabel("Комментарии к блоку").first()).toBeVisible();
});

test("abbreviation definitions open on hover or tap", async ({ page, isMobile }) => {
  test.skip(!process.env.E2E_SUPABASE_READY, "Requires migrated and seeded Supabase project.");

  await page.goto("/themes");
  const abbreviation = page.locator('[data-abbreviation-term="ABCDE"]').first();
  const definition = page
    .locator('[data-abbreviation-popover-content]')
    .filter({ hasText: "расширенный первичный осмотр" })
    .first();

  await expect(abbreviation).toBeVisible();
  if (isMobile) {
    await abbreviation.tap();
  } else {
    await abbreviation.hover();
  }

  await expect(definition).toBeVisible();
  await page.waitForTimeout(900);
  await expect(definition).toBeVisible();

  if (!isMobile) {
    await definition.hover();
    await page.waitForTimeout(250);
    await expect(definition).toBeVisible();
  }
});

test("newer perioperative abbreviations and antidote table render", async ({ page, isMobile }) => {
  test.skip(!process.env.E2E_SUPABASE_READY, "Requires migrated and seeded Supabase project.");

  await page.goto("/themes");

  const ponv = page.locator('[data-abbreviation-term="PONV"]').first();
  const pnb = page.locator('[data-abbreviation-term="PNB"]').first();

  await expect(ponv).toBeVisible();
  await expect(pnb).toBeVisible();

  if (isMobile) {
    await ponv.tap();
  } else {
    await ponv.hover();
  }
  const ponvDefinition = page
    .locator("[data-abbreviation-popover-content]")
    .filter({ hasText: "послеоперационная тошнота" })
    .first();
  await expect(ponvDefinition).toBeVisible();
  await page.waitForTimeout(800);
  await expect(ponvDefinition).toBeVisible();

  const antidoteTable = page.locator('[data-reader-markdown-table="true"]').filter({ hasText: "Налоксон" }).first();
  await expect(page.getByRole("heading", { name: "Таблица антидотов по приказу МОЗ №435" })).toBeVisible();
  await expect(antidoteTable).toBeVisible();
  await expect(antidoteTable).toContainText("Флумазенил");
  await expect(antidoteTable).toContainText("N-ацетилцистеин");
});

test("reader has no horizontal overflow across key responsive sizes", async ({ page }) => {
  test.skip(!process.env.E2E_SUPABASE_READY, "Requires migrated and seeded Supabase project.");

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/themes");
    await expect(page.getByText(/АИТ/).first()).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  }
});
