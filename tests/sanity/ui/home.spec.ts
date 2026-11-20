import { expect, test } from '@fixtures';
import { homePage as homeData } from '@utils/testData';

test.describe('Home page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('shows the welcome heading and examples section', { tag: '@smoke' }, async ({ homePage }) => {
    await expect(homePage.heading).toHaveText(homeData.heading);
    await expect(homePage.subHeading).toHaveText(homeData.subHeading);
    await expect(homePage.exampleLinks.first()).toBeVisible();
  });

  test('lists every example covered by this suite', async ({ homePage }) => {
    const names = await homePage.exampleNames();
    for (const example of homeData.coveredExamples) {
      expect(names, `"${example}" should be listed`).toContain(example);
    }
  });

  test('navigates to an example from its link', async ({ homePage, page }) => {
    await homePage.openExample('Form Authentication');
    await expect(page).toHaveURL(/\/login$/);
  });

  test('filters examples by keyword', async ({ homePage }) => {
    const total = await homePage.exampleLinks.count();

    await homePage.filterExamples('checkbox');

    await expect(homePage.visibleExampleLinks).toContainText(['Checkboxes']);
    expect(await homePage.visibleExampleLinks.count()).toBeLessThan(total);
    await expect(homePage.noMatchesMessage).toBeHidden();
  });

  test('shows an empty state when no example matches', async ({ homePage }) => {
    await homePage.filterExamples(`zz-no-such-example-${Date.now()}`);

    await expect(homePage.visibleExampleLinks).toHaveCount(0);
    await expect(homePage.noMatchesMessage).toBeVisible();
  });
});
