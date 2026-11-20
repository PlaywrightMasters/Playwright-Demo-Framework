import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ContentRow {
  avatar: string | null;
  text: string;
}

export class DynamicContentPage extends BasePage {
  protected readonly path = '/dynamic_content';

  readonly rows: Locator;
  readonly staticContentLink: Locator;

  constructor(page: Page) {
    super(page);
    this.rows = page.locator('.large-centered > .row');
    this.staticContentLink = page.getByRole('link', { name: 'click here' });
  }

  /** Opens the variant where the first two rows keep the same content across reloads. */
  async openWithStaticContent(): Promise<void> {
    await this.page.goto(`${this.path}?with_content=static`);
  }

  async readRows(): Promise<ContentRow[]> {
    const rows: ContentRow[] = [];
    for (const row of await this.rows.all()) {
      rows.push({
        avatar: await row.locator('img').getAttribute('src'),
        text: (await row.locator('.large-10').innerText()).trim(),
      });
    }
    return rows;
  }
}
