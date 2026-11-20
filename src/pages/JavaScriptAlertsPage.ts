import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export type DialogResponse = { action: 'accept'; promptText?: string } | { action: 'dismiss' };

export interface DialogDetails {
  type: string;
  message: string;
}

export class JavaScriptAlertsPage extends BasePage {
  protected readonly path = '/javascript_alerts';

  readonly alertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    super(page);
    this.alertButton = page.getByRole('button', { name: 'Click for JS Alert' });
    this.confirmButton = page.getByRole('button', { name: 'Click for JS Confirm' });
    this.promptButton = page.getByRole('button', { name: 'Click for JS Prompt' });
    this.result = page.locator('#result');
  }

  /**
   * Clicks `trigger`, answers the native dialog it opens and returns the
   * dialog's type and message.
   */
  async handleDialog(trigger: Locator, response: DialogResponse): Promise<DialogDetails> {
    // The click stalls until the dialog is handled, so both run together.
    const dialogHandled = this.page.waitForEvent('dialog').then(async (dialog) => {
      const details: DialogDetails = { type: dialog.type(), message: dialog.message() };
      if (response.action === 'accept') {
        await dialog.accept(response.promptText);
      } else {
        await dialog.dismiss();
      }
      return details;
    });
    const [details] = await Promise.all([dialogHandled, trigger.click()]);
    return details;
  }
}
