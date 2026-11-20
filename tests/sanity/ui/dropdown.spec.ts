import { expect, test } from '@fixtures';
import { dropdownOptions } from '@utils/testData';

test.describe('Dropdown', () => {
  test.beforeEach(async ({ dropdownPage }) => {
    await dropdownPage.open();
  });

  test('shows a disabled placeholder by default', { tag: '@smoke' }, async ({ dropdownPage }) => {
    await expect(dropdownPage.heading).toHaveText('Dropdown List');
    await expect(dropdownPage.dropdown).toHaveValue('');
    await expect(dropdownPage.placeholderOption).toHaveText('Please select an option');
    await expect(dropdownPage.placeholderOption).toBeDisabled();
  });

  test('offers the expected options', async ({ dropdownPage }) => {
    await expect(dropdownPage.selectableOptions).toHaveText(dropdownOptions.map((option) => option.label));
  });

  for (const { value, label } of dropdownOptions) {
    test(`selects "${label}" by value`, async ({ dropdownPage }) => {
      await dropdownPage.selectByValue(value);

      await expect(dropdownPage.dropdown).toHaveValue(value);
    });

    test(`selects "${label}" by label`, async ({ dropdownPage }) => {
      await dropdownPage.selectByLabel(label);

      await expect(dropdownPage.dropdown).toHaveValue(value);
    });
  }

  test('changes an existing selection', async ({ dropdownPage }) => {
    await dropdownPage.selectByLabel('Option 1');
    await expect(dropdownPage.dropdown).toHaveValue('1');

    await dropdownPage.selectByLabel('Option 2');
    await expect(dropdownPage.dropdown).toHaveValue('2');
  });
});
