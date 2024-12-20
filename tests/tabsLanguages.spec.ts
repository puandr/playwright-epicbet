import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../managers/pageObjectManager";
import fs from "fs";

test.describe("Checking for tabs locales change on language change, English", () => {
  let pageObjectManager: PageObjectManager;

  const languageData = JSON.parse(
    fs.readFileSync("./data/mainPageTabsLanguages.json", "utf-8")
  );

  test.beforeEach(async ({ page }) => {
    pageObjectManager = new PageObjectManager(page);
    await pageObjectManager.mainPage.navigateTo("/");
  });

  test("Tabs language test, English @smoke @regression @tabs @languages @English", {
    annotation: {
      type: 'regression',
      description: 'https://jira.com/issue/666',
    },
  }, async ({ page }) => {
    await pageObjectManager.mainPage.selectLanguage("en");
    const enTranslations = languageData["en"];

    for (const [dataTestId, textValue] of Object.entries(enTranslations)) {
      const element = page.locator(`[data-testid="${dataTestId}"]`);

      await expect(element).toBeVisible();

      await expect(element).toHaveText(textValue);
    }
  });

  test("Tabs language test, Estonian @smoke @regression @tabs @languages @Estonian", {
    annotation: {
      type: 'regression',
      description: 'https://jira.com/issue/666',
    },
  }, async ({ page }) => {
    await pageObjectManager.mainPage.selectLanguage("et");

    const enTranslations = languageData["et"];

    for (const [dataTestId, textValue] of Object.entries(enTranslations)) {
      const element = page.locator(`[data-testid="${dataTestId}"]`);

      await expect(element).toBeVisible();

      await expect(element).toHaveText(textValue);
    }
  });

  test("Tabs language test, Finnish @smoke @regression @tabs @languages @Finnish", {
    annotation: {
      type: 'regression',
      description: 'https://jira.com/issue/666',
    },
  }, async ({ page }) => {
    await pageObjectManager.mainPage.selectLanguage("fi");

    const enTranslations = languageData["fi"];

    for (const [dataTestId, textValue] of Object.entries(enTranslations)) {
      const element = page.locator(`[data-testid="${dataTestId}"]`);

      await expect(element).toBeVisible();

      await expect(element).toHaveText(textValue);
    }
  });

  test("Tabs language test, Spanish @smoke @regression @tabs @languages @Spanish", {
    annotation: {
      type: 'regression',
      description: 'https://jira.com/issue/666',
    },
  }, async ({ page }) => {
    await pageObjectManager.mainPage.selectLanguage("es");

    const enTranslations = languageData["es"];

    for (const [dataTestId, textValue] of Object.entries(enTranslations)) {
      const element = page.locator(`[data-testid="${dataTestId}"]`);

      await expect(element).toBeVisible();

      await expect(element).toHaveText(textValue);
    }
  });

  test("Tabs language test, Icelandic @smoke @regression @tabs @languages @Icelandic", {
    annotation: {
      type: 'regression',
      description: 'https://jira.com/issue/666',
    },
  }, async ({ page }) => {
    await pageObjectManager.mainPage.selectLanguage("is");

    const enTranslations = languageData["is"];

    for (const [dataTestId, textValue] of Object.entries(enTranslations)) {
      const element = page.locator(`[data-testid="${dataTestId}"]`);

      await expect(element).toBeVisible();

      await expect(element).toHaveText(textValue);
    }
  });
});
