import type { Locator, Page } from '@playwright/test';

/**
 * Shared behaviour for every page object.
 *
 * Subclasses declare the relative `path` of their page; navigation resolves it
 * against the `baseURL` configured in playwright.config.ts. Page objects expose
 * locators and user-level actions; assertions stay in the specs.
 */
export abstract class BasePage {
  /** Relative URL of the page, e.g. `/login`. */
  protected abstract readonly path: string;

  /** Main landmark of the-internet pages (some pages contain duplicate `#content` ids). */
  readonly main: Locator;
  /** First heading inside the main landmark. */
  readonly heading: Locator;

  constructor(readonly page: Page) {
    this.main = page.getByRole('main');
    this.heading = this.main.getByRole('heading').first();
  }

  /** Navigates to the page and waits for the `load` event. */
  async open(): Promise<void> {
    await this.page.goto(this.path);
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  async title(): Promise<string> {
    return this.page.title();
  }
}
