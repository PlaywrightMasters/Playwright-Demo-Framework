import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  protected readonly path = '/';

  readonly subHeading: Locator;
  readonly exampleLinks: Locator;
  readonly visibleExampleLinks: Locator;
  readonly filterInput: Locator;
  readonly noMatchesMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.subHeading = this.main.getByRole('heading', { level: 2 });
    this.exampleLinks = this.main.locator('ul li a');
    this.visibleExampleLinks = this.exampleLinks.filter({ visible: true });
    this.filterInput = page.getByLabel('Filter examples');
    this.noMatchesMessage = page.getByText('No examples match.');
  }

  async openExample(name: string): Promise<void> {
    await this.main.getByRole('link', { name, exact: true }).click();
  }

  async filterExamples(query: string): Promise<void> {
    await this.filterInput.fill(query);
  }

  async exampleNames(): Promise<string[]> {
    return (await this.exampleLinks.allTextContents()).map((name) => name.trim());
  }
}
