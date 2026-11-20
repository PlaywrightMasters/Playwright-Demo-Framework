import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContextMenuPage extends BasePage {
  protected readonly path = '/context_menu';

  readonly hotspot: Locator;

  constructor(page: Page) {
    super(page);
    this.hotspot = page.locator('#hot-spot');
  }

  /**
   * Right-clicks the hotspot, accepts the native alert it raises and
   * returns the alert message.
   */
  async rightClickHotspot(): Promise<string> {
    // The click stalls until the dialog is handled, so both run together.
    const dialogHandled = this.page.waitForEvent('dialog').then(async (dialog) => {
      const message = dialog.message();
      await dialog.accept();
      return message;
    });
    const [message] = await Promise.all([dialogHandled, this.hotspot.click({ button: 'right' })]);
    return message;
  }
}
