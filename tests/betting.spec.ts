import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../managers/pageObjectManager";

test.describe("Betting tests @smoke @", () => {
  let pom: PageObjectManager;

  test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
    await pom.mainPage.navigateTo("/");
  });

  test("Betting requires sign in, English @smoke @regression @signin @betting @unsigned", {
    annotation: {
      type: 'issue',
      description: 'https://jira.com/issue/666',
    },
  }, async ({ page }) => {
    await pom.mainPage.selectLanguage("en");

    await pom.navigationPage.clickElement(
      "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"
    );

    await page.locator('[data-testid="outcome-button"]').first().click();
    await page.locator('[data-testid="stake-input"]').fill("10");
    await page
      .locator('[data-testid="place-bet-button"]')
      .click({ force: true });

    const isTextVisible = await page.locator("text=Login options").isVisible();
    expect(isTextVisible).toBeTruthy();
  });
});
