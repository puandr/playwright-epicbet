import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class BrokenLinksPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Retrieves all hyperlink URLs from the page.
   * @returns An array of URLs from all <a> elements on the page.
   */
  async getAllLinks(): Promise<string[]> {
    return await this.page.$$eval("a", (links) =>
      links.map((link) => link.href)
    );
  }

  /**
   * Checks for broken links on the page.
   * @returns An array of objects containing the link, status, and optional error message for broken links.
   */
  async checkForBrokenLinks(): Promise<
    { link: string; status: string | number; error?: string }[]
  > {
    const links = await this.getAllLinks();
    const brokenLinks: {
      link: string;
      status: string | number;
      error?: string;
    }[] = [];

    for (const link of links) {
      try {
        const response = await this.page.goto(link);
        if (!response || response.status() >= 400) {
          brokenLinks.push({
            link,
            status: response ? response.status() : "No Response",
          });
        }
      } catch (error) {
        brokenLinks.push({ link, status: "Error", error: error.message });
      }
    }
    return brokenLinks;
  }
}
