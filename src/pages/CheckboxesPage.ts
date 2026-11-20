import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckboxesPage extends BasePage {
  protected readonly path = '/checkboxes';

  readonly checkboxes: Locator;

  constructor(page: Page) {
    super(page);
    this.checkboxes = page.locator('#checkboxes input[type="checkbox"]');
  }

  checkbox(index: number): Locator {
    return this.checkboxes.nth(index);
  }

  async setCheckboxState(index: number, checked: boolean): Promise<void> {
    await this.checkbox(index).setChecked(checked);
  }

  async setAll(checked: boolean): Promise<void> {
    for (const checkbox of await this.checkboxes.all()) {
      await checkbox.setChecked(checked);
    }
  }
}
