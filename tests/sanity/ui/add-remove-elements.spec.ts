import { expect, test } from '@fixtures';

test.describe('Add/remove elements', () => {
  test.beforeEach(async ({ addRemoveElementsPage }) => {
    await addRemoveElementsPage.open();
  });

  test('starts without added elements', async ({ addRemoveElementsPage }) => {
    await expect(addRemoveElementsPage.heading).toHaveText('Add/Remove Elements');
    await expect(addRemoveElementsPage.deleteButtons).toHaveCount(0);
  });

  test('adds one delete button per click', async ({ addRemoveElementsPage }) => {
    await addRemoveElementsPage.addElements(3);

    await expect(addRemoveElementsPage.deleteButtons).toHaveCount(3);
  });

  test('removes an element when its delete button is clicked', async ({ addRemoveElementsPage }) => {
    await addRemoveElementsPage.addElements(2);

    await addRemoveElementsPage.deleteFirstElement();
    await expect(addRemoveElementsPage.deleteButtons).toHaveCount(1);

    await addRemoveElementsPage.deleteFirstElement();
    await expect(addRemoveElementsPage.deleteButtons).toHaveCount(0);
  });
});
