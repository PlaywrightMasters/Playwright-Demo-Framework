import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Example 1 hides an element that already exists in the DOM;
 * example 2 renders the element only after loading finishes.
 */
export type DynamicLoadingExample = 1 | 2;

export class DynamicLoadingPage extends BasePage {
  protected readonly path: string;

  readonly startButton: Locator;
  readonly loadingIndicator: Locator;
  readonly finishText: Locator;

  constructor(page: Page, example: DynamicLoadingExample = 1) {
    super(page);
    this.path = `/dynamic_loading/${example}`;
    this.startButton = page.getByRole('button', { name: 'Start' });
    this.loadingIndicator = page.locator('#loading');
    this.finishText = page.locator('#finish');
  }

  async start(): Promise<void> {
    await this.startButton.click();
  }
}
