import { expect, test } from '@fixtures';
import { uniqueEmail } from '@utils/helpers';
import { messages } from '@utils/testData';

test.describe('Forgot password', () => {
  test.beforeEach(async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.open();
  });

  test('shows the reset form', async ({ forgotPasswordPage }) => {
    await expect(forgotPasswordPage.heading).toHaveText('Forgot Password');
    await expect(forgotPasswordPage.emailInput).toBeEditable();
    await expect(forgotPasswordPage.retrievePasswordButton).toBeEnabled();
  });

  test('confirms that the reset e-mail was sent', { tag: '@smoke' }, async ({ forgotPasswordPage, page }) => {
    await forgotPasswordPage.requestPasswordReset(uniqueEmail());

    await expect(page).toHaveURL(/\/email_sent$/);
    await expect(forgotPasswordPage.main).toContainText(messages.forgotPassword.sent);
  });
});
