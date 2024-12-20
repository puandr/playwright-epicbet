import { Page, Locator } from "@playwright/test";

export class BasePage {
  protected page: Page;

  /**
   * Constructor to initialize the page object.
   * @param page - The Playwright Page object.
   */
  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = "/") {
    await this.page.goto(path);
  }

  //TODO: refactor, more languages available (and in future too)
  async verifyCorrectLanguage() {
    const url = this.page.url();
    if (!url.includes("/en") && !url.includes("/et") && !url.includes("/fi")) {
      throw new Error(
        `URL does not contain a supported language. Current URL: ${url}`
      );
    }
  }

  /**
   * Navigates to the specified URL.
   * @param url - The URL to navigate to.
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Clicks an element using Playwright's getByTestId method
   */
  async clickElementByTestId(testId: string): Promise<void> {
    await this.page.getByTestId(testId).click();
  }

  /**
   * Clicks on an element matching the selector.
   * @param selector - The selector for the element to be clicked.
   */
  async clickElement(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  /**
   * Types text into an input field.
   * @param selector - The selector for the input field.
   * @param text - The text to be typed.
   */
  async typeText(selector: string, text: string): Promise<void> {
    await this.page.locator(selector).fill(text);
  }

  /**
   * Gets the text content of an element.
   * @param selector - The selector for the element.
   * @returns The text content of the element.
   */
  async getText(selector: string): Promise<string> {
    return (await this.page.locator(selector).textContent()) ?? "";
  }

  /**
   * Waits for an element to be visible on the page.
   * @param selector - The selector for the element to wait for.
   */
  async waitForElement(selector: string): Promise<void> {
    await this.page.locator(selector).waitFor({ state: "visible" });
  }

  /**
   * Checks if an element is visible on the page.
   * @param selector - The selector for the element.
   * @returns True if the element is visible, false otherwise.
   */
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Checks if an element is enabled on the page.
   * @param selector - The selector for the element.
   * @returns True if the element is enabled, false otherwise.
   */
  async isElementEnabled(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isEnabled();
  }

  /**
   * Checks if an element is checked (for checkboxes or radio buttons).
   * @param selector - The selector for the checkbox or radio button.
   * @returns True if the element is checked, false otherwise.
   */
  async isElementChecked(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isChecked();
  }

  /**
   * Selects an option from a dropdown.
   * @param selector - The selector for the dropdown element.
   * @param value - The value of the option to be selected.
   */
  async selectDropdownOption(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).selectOption(value);
  }

  /**
   * Waits for a specific URL to be loaded.
   * @param url - The URL to wait for.
   */
  async waitForURL(url: string): Promise<void> {
    await this.page.waitForURL(url);
  }

  /**
   * Waits for a specific network request to complete.
   * @param urlPart - A part of the URL to match the network request.
   */
  async waitForNetworkRequest(urlPart: string): Promise<void> {
    await this.page.waitForResponse((response) =>
      response.url().includes(urlPart)
    );
  }

  /**
   * Takes a screenshot of the current page.
   * @param filePath - The path where the screenshot will be saved.
   */
  async takeScreenshot(filePath: string): Promise<void> {
    await this.page.screenshot({ path: filePath });
  }

  /**
   * Scrolls to an element on the page.
   * @param selector - The selector for the element to scroll to.
   */
  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Simulates a hover action over an element.
   * @param selector - The selector for the element to hover over.
   */
  async hoverElement(selector: string): Promise<void> {
    await this.page.locator(selector).hover();
  }

  /**
   * Selects a language from the language selection dropdown.
   * @param languageKey - The key of the language to be selected.
   */
  async selectLanguage(languageKey: string): Promise<void> {
    await this.page.getByTestId("language-button").click();
    await this.page.locator(`[data-testkey="${languageKey}"]`).click();
  }
}
