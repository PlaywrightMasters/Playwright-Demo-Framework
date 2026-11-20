import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddRemoveElementsPage extends BasePage {
  protected readonly path = '/add_remove_elements/';

  readonly addButton: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.addButton = page.getByRole('button', { name: 'Add Element' });
    this.deleteButtons = page.locator('#elements').getByRole('button', { name: 'Delete' });
  }

  async addElements(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.addButton.click();
    }
  }

  async deleteFirstElement(): Promise<void> {
    await this.deleteButtons.first().click();
  }
}
