import { expect, test } from '@fixtures';
import { DynamicLoadingPage, type DynamicLoadingExample } from '@pages';
import { messages } from '@utils/testData';

const examples: { example: DynamicLoadingExample; description: string }[] = [
  { example: 1, description: 'reveals a hidden element' },
  { example: 2, description: 'renders a new element' },
];

test.describe('Dynamic loading', () => {
  for (const { example, description } of examples) {
    test(`example ${example} ${description} after loading`, async ({ page }) => {
      const dynamicLoadingPage = new DynamicLoadingPage(page, example);
      await dynamicLoadingPage.open();

      await dynamicLoadingPage.start();
      await expect(dynamicLoadingPage.loadingIndicator).toBeVisible();

      // The demo page waits five seconds before it shows the result.
      await expect(dynamicLoadingPage.finishText).toHaveText(messages.dynamicLoading.finished, { timeout: 15_000 });
      await expect(dynamicLoadingPage.loadingIndicator).toBeHidden();
      await expect(dynamicLoadingPage.startButton).toBeHidden();
    });
  }
});
