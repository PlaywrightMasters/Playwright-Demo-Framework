import { expect, test } from '@fixtures';
import { randomString } from '@utils/helpers';
import { messages } from '@utils/testData';

const text = messages.javascriptAlerts;

test.describe('JavaScript alerts', () => {
  test.beforeEach(async ({ javaScriptAlertsPage }) => {
    await javaScriptAlertsPage.open();
  });

  test('accepts an alert', { tag: '@smoke' }, async ({ javaScriptAlertsPage: alerts }) => {
    const dialog = await alerts.handleDialog(alerts.alertButton, { action: 'accept' });

    expect(dialog).toEqual({ type: 'alert', message: text.alert });
    await expect(alerts.result).toHaveText(text.alertResult);
  });

  test('accepts a confirm', async ({ javaScriptAlertsPage: alerts }) => {
    const dialog = await alerts.handleDialog(alerts.confirmButton, { action: 'accept' });

    expect(dialog).toEqual({ type: 'confirm', message: text.confirm });
    await expect(alerts.result).toHaveText(text.confirmOkResult);
  });

  test('dismisses a confirm', async ({ javaScriptAlertsPage: alerts }) => {
    await alerts.handleDialog(alerts.confirmButton, { action: 'dismiss' });

    await expect(alerts.result).toHaveText(text.confirmCancelResult);
  });

  test('answers a prompt', async ({ javaScriptAlertsPage: alerts }) => {
    const answer = `playwright-${randomString(8)}`;

    const dialog = await alerts.handleDialog(alerts.promptButton, { action: 'accept', promptText: answer });

    expect(dialog).toEqual({ type: 'prompt', message: text.prompt });
    await expect(alerts.result).toHaveText(text.promptResult(answer));
  });

  test('dismisses a prompt', async ({ javaScriptAlertsPage: alerts }) => {
    await alerts.handleDialog(alerts.promptButton, { action: 'dismiss' });

    await expect(alerts.result).toHaveText(text.promptCancelledResult);
  });
});
