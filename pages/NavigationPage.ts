import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class NavigationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Clicks on a navigation link using a testId and waits for page navigation
   */
  async navigateToPage(testId: string): Promise<void> {
    await this.clickElementByTestId(testId);
  }

  /**
   * Navigates to a specified link by clicking on it.
   * @param link - The selector or identifier of the link to navigate to.
   */
  async navigateToLink(link: string): Promise<void> {
    await this.clickElement(link);
  }

  /**
   * Verifies if the URL matches the expected URL
   */
  async verifyNavigation(expectedUrl: string): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl === expectedUrl;
  }
}
