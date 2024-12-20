import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../managers/pageObjectManager";

test.describe("Test for main object of main page to be visible", () => {
  let pom: PageObjectManager;

  test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
    await pom.mainPage.navigateTo("/");
    await pom.mainPage.selectLanguage("en");
  });

  test("User can register, with deposit in Estonia, English @smoke @regression @signup @deposit @estonia", {
    annotation: {
      type: 'regression',
      description: 'https://jira.com/issue/666',
    },
  }, async ({
    page,
  }) => {
    await pom.navigationPage.clickElement(
      "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"
    );

    await pom.navigationPage.navigateToPage("signup-button");

    //TODO a better soliution?
    await page.waitForTimeout(3000);
    await page.getByTestId("continue-button").click({ force: true });
    await page.waitForURL(
      "https://checkout-cdn.zimpler.net/v4/ee/deposits?s=*"
    );
    await page.waitForSelector('[data-bank="SEB"]');

    const isSebVisible = await pom.mainPage.isElementVisible(
      '[data-bank="SEB"]'
    );
    const isSwedbankVisible = await pom.mainPage.isElementVisible(
      '[data-bank="Swedbank"]'
    );
    const isLhvVisible = await pom.mainPage.isElementVisible(
      '[data-bank="LHV"]'
    );
    const isLuminorVisible = await pom.mainPage.isElementVisible(
      '[data-bank="Luminor"]'
    );

    expect(isSebVisible).toBeTruthy();
    expect(isSwedbankVisible).toBeTruthy();
    expect(isLhvVisible).toBeTruthy();
    expect(isLuminorVisible).toBeTruthy();
  });

  test("User can register, without deposit in Estonia, English @smoke @regression @signup @nodeposit @estonia", {
    annotation: {
      type: 'regression',
      description: 'https://jira.com/issue/666',
    },
  }, async ({
    page,
  }) => {
    await pom.navigationPage.clickElement(
      "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"
    );
    await pom.navigationPage.navigateToPage("signup-button");

    //TODO a better soliution?
    await page.waitForTimeout(3000);

    await page.getByText("Register without deposit").click({ force: true });
    await page.getByTestId("continue-button").click({ force: true });
    await page.waitForURL(
      "https://checkout-cdn.zimpler.net/v4/ee/identification?s=*"
    );
    await page.waitForSelector('[data-bank="SEB"]');

    const isSebVisible = await pom.mainPage.isElementVisible(
      '[data-bank="SEB"]'
    );
    const isSwedbankVisible = await pom.mainPage.isElementVisible(
      '[data-bank="Swedbank"]'
    );
    const isLhvVisible = await pom.mainPage.isElementVisible(
      '[data-bank="LHV"]'
    );
    const isLuminorVisible = await pom.mainPage.isElementVisible(
      '[data-bank="Luminor"]'
    );

    expect(isSebVisible).toBeTruthy();
    expect(isSwedbankVisible).toBeTruthy();
    expect(isLhvVisible).toBeTruthy();
    expect(isLuminorVisible).toBeTruthy();
  });
});
