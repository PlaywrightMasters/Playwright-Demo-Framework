import { expect, test } from '@fixtures';
import { messages } from '@utils/testData';

test.describe('Context menu', () => {
  test('right-clicking the hotspot raises a JavaScript alert', async ({ contextMenuPage }) => {
    await contextMenuPage.open();
    await expect(contextMenuPage.heading).toHaveText('Context Menu');

    const alertMessage = await contextMenuPage.rightClickHotspot();

    expect(alertMessage).toBe(messages.contextMenu.alert);
  });
});
