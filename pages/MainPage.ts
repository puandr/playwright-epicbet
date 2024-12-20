import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class MainPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Checks the page responsiveness by resizing the viewport to multiple sizes.
   * @param viewports - An array of viewport dimensions to test.
   */
  async checkResponsiveness(
    viewports: { width: number; height: number }[]
  ): Promise<void> {
    for (const viewport of viewports) {
      await this.page.setViewportSize(viewport);
      await this.page.waitForTimeout(1000); // Wait to ensure the page adjusts properly
    }
  }
}
