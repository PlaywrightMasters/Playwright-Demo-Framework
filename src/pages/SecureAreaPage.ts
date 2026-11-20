import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SecureAreaPage extends BasePage {
  protected readonly path = '/secure';

  readonly flashMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.flashMessage = page.locator('#flash');
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
