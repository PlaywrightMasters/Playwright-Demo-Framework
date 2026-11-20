import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
  protected readonly path = '/forgot_password';

  readonly emailInput: Locator;
  readonly retrievePasswordButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('E-mail');
    this.retrievePasswordButton = page.getByRole('button', { name: 'Retrieve password' });
  }

  async requestPasswordReset(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.retrievePasswordButton.click();
  }
}
