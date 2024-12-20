import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { BrokenLinksPage } from "../pages/BrokenLinksPage";
import { NavigationPage } from "../pages/NavigationPage";
import { MainPage } from "../pages/MainPage";

class PageObjectManager {
  page: Page;
  mainPage: MainPage;
  navigationPage: NavigationPage;
  brokenLinksPage: BrokenLinksPage;

  constructor(page: Page) {
    this.page = page;
    this.mainPage = new MainPage(page);
    this.navigationPage = new NavigationPage(page);
    this.brokenLinksPage = new BrokenLinksPage(page);
  }

  getBasePage(): BasePage {
    return new BasePage(this.page);
  }
}

export { PageObjectManager };
