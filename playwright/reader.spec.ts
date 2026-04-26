import { expect, test, type Page } from "@playwright/test";

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

test("system dark theme applies before reader interaction", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/themes", { waitUntil: "domcontentloaded" });

  await expect
    .poll(async () => page.evaluate(() => document.documentElement.classList.contains("dark")))
    .toBe(true);
  await expect(page.getByLabel("Переключить тему")).toBeVisible();
});

test("system light theme keeps the reader light before interaction", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("theme", "system");
  });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/themes", { waitUntil: "domcontentloaded" });

  await expect
    .poll(async () =>
      page.evaluate(() => ({
        hasDarkClass: document.documentElement.classList.contains("dark"),
        colorScheme: document.documentElement.style.colorScheme,
      })),
    )
    .toEqual({ hasDarkClass: false, colorScheme: "light" });
  await expect(page.getByLabel("Переключить тему")).toBeVisible();
});

test("seeded reader supports navigation and comments", async ({ page }) => {
  test.skip(!process.env.E2E_SUPABASE_READY, "Requires migrated and seeded Supabase project.");

  await page.goto("/themes");
  await expect(page.getByText(/\d+ тем/)).toBeVisible();
  await expect(page.getByText(/\d+ блоков/)).toBeVisible();
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

test("all-themes reader remembers the last active theme and offers floating navigation", async ({ page }) => {
  test.skip(!process.env.E2E_SUPABASE_READY, "Requires migrated and seeded Supabase project.");

  const storageKey = "ait-study-reader:last-theme-slug";

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/themes");

  const slugs = await page.locator("[data-reader-theme]").evaluateAll((elements) =>
    elements.flatMap((element) => {
      const slug = element.getAttribute("data-reader-theme");
      return slug ? [slug] : [];
    }),
  );

  expect(slugs.length).toBeGreaterThan(3);
  const restoredSlug = slugs[2]!;
  const previousSlug = slugs[1]!;

  await page.evaluate(
    ([key, slug]) => window.localStorage.setItem(key, slug),
    [storageKey, restoredSlug],
  );
  await page.goto("/themes");

  await expectThemeAlignedNearTop(page, restoredSlug);
  await expect(page.getByTestId("all-themes-floating-nav")).toBeVisible();

  await page.getByTestId("reader-floating-prev").click();
  await expect
    .poll(async () => page.evaluate((key) => window.localStorage.getItem(key), storageKey))
    .toBe(previousSlug);
  await expectThemeAlignedNearTop(page, previousSlug);
});

test("all-themes jump menu expands and navigates without leaving the reader", async ({ page, isMobile }) => {
  test.skip(!process.env.E2E_SUPABASE_READY, "Requires migrated and seeded Supabase project.");

  await page.goto("/themes");
  await page.getByTestId("reader-theme-jump-trigger").click();

  const jumpMenu = page.locator('[data-reader-theme-jump="open"]');
  await expect(jumpMenu).toBeVisible();
  const jumpScroller = jumpMenu.locator("[data-reader-theme-menu-scroll]");
  await expect
    .poll(async () =>
      jumpScroller.evaluate((element) => ({
        canScroll: element.scrollHeight > element.clientHeight,
        overflowY: window.getComputedStyle(element).overflowY,
      })),
    )
    .toEqual({ canScroll: true, overflowY: "auto" });

  const targetTheme = page.locator("[data-reader-theme]").nth(2);
  const targetSlug = await targetTheme.getAttribute("data-reader-theme");
  expect(targetSlug).toBeTruthy();

  await jumpMenu.locator("nav button").nth(2).click();

  await expect(page).toHaveURL(/\/themes$/);
  await expectThemeAlignedNearTop(page, targetSlug!);

  if (!isMobile) {
    await expect(page.locator('[data-reader-theme-nav="expanded"]')).toBeVisible();
  }
});

test("desktop theme rail collapses to numbers and expands again", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop-only vertical rail behavior.");
  test.skip(!process.env.E2E_SUPABASE_READY, "Requires migrated and seeded Supabase project.");

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/themes");

  await expect(page.locator('[data-reader-theme-nav="expanded"]')).toBeVisible();
  const themeAside = page.locator("aside").filter({ has: page.locator("[data-reader-theme-nav]") });
  await expect
    .poll(async () => themeAside.evaluate((element) => element.getBoundingClientRect().left))
    .toBeLessThanOrEqual(1);

  await page.getByLabel("Свернуть список тем").click();
  await expect(page.locator('[data-reader-theme-nav="collapsed"]')).toBeVisible();

  await expect
    .poll(async () => themeAside.evaluate((element) => element.getBoundingClientRect().width))
    .toBeLessThanOrEqual(104);
  await expect
    .poll(async () => themeAside.evaluate((element) => element.getBoundingClientRect().left))
    .toBeLessThanOrEqual(1);
  await assertNoDocumentOverflow(page);

  await page.getByLabel("Развернуть список тем").click();
  await expect(page.locator('[data-reader-theme-nav="expanded"]')).toBeVisible();

  await expect
    .poll(async () => themeAside.evaluate((element) => element.getBoundingClientRect().width))
    .toBeGreaterThanOrEqual(280);
  await assertNoDocumentOverflow(page);
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
  await expect(page.getByRole("heading", { name: /Таблица антидотов|Практическая таблица антидотов/ })).toBeVisible();
  await expect(antidoteTable).toBeVisible();
  await expect(antidoteTable).toContainText("Флумазенил");
  await expect(antidoteTable).toContainText("N-ацетилцистеин");

  const firstRiskCell = antidoteTable
    .locator('[role="row"]')
    .nth(1)
    .locator('[role="cell"]')
    .filter({ hasText: /сначала.*вентиляц/i })
    .first();
  await expect(firstRiskCell).toBeVisible();
  await expect
    .poll(async () => firstRiskCell.evaluate((element) => element.getBoundingClientRect().width))
    .toBeGreaterThan(320);
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

test("wide reader tables stay readable across responsive sizes", async ({ page }) => {
  test.skip(!process.env.E2E_SUPABASE_READY, "Requires migrated and seeded Supabase project.");

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 375, height: 667 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1280, height: 800 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/themes");

    const antidoteTable = page.locator('[data-reader-markdown-table="true"]').filter({ hasText: "Налоксон" }).first();
    const tableScroll = antidoteTable.locator("[data-reader-table-scroll]");
    const firstRiskCell = antidoteTable
      .locator('[role="row"]')
      .nth(1)
      .locator('[role="cell"]')
      .filter({ hasText: /сначала.*вентиляц/i })
      .first();

    await expect(antidoteTable).toBeVisible();
    await expect(firstRiskCell).toBeVisible();
    await expect
      .poll(async () => firstRiskCell.evaluate((element) => element.getBoundingClientRect().width))
      .toBeGreaterThan(320);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const tableMetrics = await tableScroll.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));

    expect(tableMetrics.scrollWidth).toBeGreaterThanOrEqual(tableMetrics.clientWidth);

    if (tableMetrics.scrollWidth > tableMetrics.clientWidth + 1) {
      await tableScroll.evaluate((element) => {
        element.scrollLeft = element.scrollWidth;
      });

      const cellVisibility = await firstRiskCell.evaluate((element) => {
        const cellRect = element.getBoundingClientRect();
        const scroller = element.closest("[data-reader-table-scroll]");
        const scrollRect = scroller?.getBoundingClientRect();

        return Boolean(
          scrollRect &&
            cellRect.width > 320 &&
            cellRect.left < scrollRect.right &&
            cellRect.right > scrollRect.left,
        );
      });

      expect(cellVisibility).toBe(true);
    }
  }
});

test("project UI surfaces remain usable across responsive sizes", async ({ page }) => {
  test.setTimeout(120_000);
  test.skip(!process.env.E2E_SUPABASE_READY, "Requires migrated and seeded Supabase project.");

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 360, height: 740 },
    { width: 375, height: 667 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1280, height: 800 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);

    await page.goto("/");
    await expect(page).toHaveURL(/\/themes$/);
    await expect(page.getByRole("heading", { name: "Все темы" })).toBeVisible();
    await expect(page.getByText(/\d+ блоков/)).toBeVisible();
    await assertNoDocumentOverflow(page);

    await page.getByLabel("Переключить тему").click();
    await expect(page.getByRole("menuitem", { name: "Системная", exact: true })).toBeVisible();
    await assertNoDocumentOverflow(page);
    await page.keyboard.press("Escape");

    if (viewport.width < 768) {
      await page.getByLabel("Открыть список тем").click();
      const themeDialog = page.getByRole("dialog").filter({ hasText: "Темы" });
      await expect(themeDialog).toBeVisible();
      await expect(themeDialog.getByRole("link", { name: /Передоперационная оценка/ })).toBeVisible();
      await assertNoDocumentOverflow(page);
      await page.keyboard.press("Escape");
    } else {
      await expect(page.getByRole("link", { name: /Передоперационная оценка/ }).first()).toBeVisible();
    }

    await page.getByLabel("Комментарии к теме").first().click();
    const commentDialog = page.getByRole("dialog").filter({ hasText: "Комментарии" });
    await expect(commentDialog).toBeVisible();
    await expect(commentDialog.getByLabel("Имя", { exact: true })).toBeVisible();
    await expect(commentDialog.getByLabel("Комментарий", { exact: true })).toBeVisible();
    await assertNoDocumentOverflow(page);
    await page.keyboard.press("Escape");

    await page.goto("/themes/peredoperatsionnaya-otsenka-komorbidnost-i-individualnyy-risk");
    await expect(
      page.getByRole("heading", {
        name: "Передоперационная оценка, коморбидность и индивидуальный риск",
        level: 1,
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Назад/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Далее/ })).toBeVisible();
    await expect(page.getByLabel("Комментарии к блоку").first()).toBeVisible();

    if (viewport.width < 768) {
      await expect(page.getByLabel("Вернуться ко всем темам")).toBeVisible();
      await page.getByLabel("Открыть список тем").click();
      const themeDialog = page.getByRole("dialog").filter({ hasText: "Темы" });
      await expect(themeDialog.getByRole("link", { name: "Все темы одним списком" })).toBeVisible();
      await page.keyboard.press("Escape");
    }

    await assertNoDocumentOverflow(page);
  }
});

async function assertNoDocumentOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

async function expectThemeAlignedNearTop(page: Page, slug: string) {
  await expect
    .poll(async () =>
      page.locator(`[data-reader-theme="${slug}"]`).evaluate((element) => {
        const top = element.getBoundingClientRect().top;
        return top >= 48 && top <= 132;
      }),
    )
    .toBe(true);
}
