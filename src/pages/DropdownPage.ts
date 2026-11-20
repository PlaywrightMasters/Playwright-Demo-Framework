import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DropdownPage extends BasePage {
  protected readonly path = '/dropdown';

  readonly dropdown: Locator;
  readonly placeholderOption: Locator;
  readonly selectableOptions: Locator;

  constructor(page: Page) {
    super(page);
    this.dropdown = page.locator('#dropdown');
    this.placeholderOption = this.dropdown.locator('option[disabled]');
    this.selectableOptions = this.dropdown.locator('option:not([disabled])');
  }

  async selectByValue(value: string): Promise<void> {
    await this.dropdown.selectOption({ value });
  }

  async selectByLabel(label: string): Promise<void> {
    await this.dropdown.selectOption({ label });
  }
}
