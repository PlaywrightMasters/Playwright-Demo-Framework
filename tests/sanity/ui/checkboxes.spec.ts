import { expect, test } from '@fixtures';

test.describe('Checkboxes', () => {
  test.beforeEach(async ({ checkboxesPage }) => {
    await checkboxesPage.open();
  });

  test('renders two checkboxes with the second checked by default', { tag: '@smoke' }, async ({ checkboxesPage }) => {
    await expect(checkboxesPage.heading).toHaveText('Checkboxes');
    await expect(checkboxesPage.checkboxes).toHaveCount(2);
    await expect(checkboxesPage.checkbox(0)).not.toBeChecked();
    await expect(checkboxesPage.checkbox(1)).toBeChecked();
  });

  test('checks an unchecked checkbox', async ({ checkboxesPage }) => {
    await checkboxesPage.setCheckboxState(0, true);

    await expect(checkboxesPage.checkbox(0)).toBeChecked();
  });

  test('unchecks a checked checkbox', async ({ checkboxesPage }) => {
    await checkboxesPage.setCheckboxState(1, false);

    await expect(checkboxesPage.checkbox(1)).not.toBeChecked();
  });

  test('checks every checkbox', async ({ checkboxesPage }) => {
    await checkboxesPage.setAll(true);

    for (const checkbox of await checkboxesPage.checkboxes.all()) {
      await expect(checkbox).toBeChecked();
    }
  });

  test('unchecks every checkbox', async ({ checkboxesPage }) => {
    await checkboxesPage.setAll(false);

    for (const checkbox of await checkboxesPage.checkboxes.all()) {
      await expect(checkbox).not.toBeChecked();
    }
  });
});
