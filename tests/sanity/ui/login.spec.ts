import { expect, test } from '@fixtures';
import { messages, users } from '@utils/testData';

test.describe('Form authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('logs in with valid credentials', { tag: '@smoke' }, async ({ loginPage, secureAreaPage, page }) => {
    await loginPage.login(users.valid);

    await expect(page).toHaveURL(/\/secure$/);
    await expect(secureAreaPage.heading).toHaveText('Secure Area');
    await expect(secureAreaPage.flashMessage).toContainText(messages.login.success);
    await expect(secureAreaPage.flashMessage).toHaveClass(/success/);
  });

  test('logs in by pressing Enter', async ({ loginPage, page }) => {
    await loginPage.loginWithKeyboard(users.valid);

    await expect(page).toHaveURL(/\/secure$/);
  });

  test('logs out and returns to the login page', async ({ loginPage, secureAreaPage, page }) => {
    await loginPage.login(users.valid);
    await secureAreaPage.logout();

    await expect(page).toHaveURL(/\/login$/);
    await expect(loginPage.flashMessage).toContainText(messages.login.loggedOut);
  });

  const invalidLogins = [
    { name: 'unknown username', credentials: users.invalidUsername, error: messages.login.invalidUsername },
    { name: 'wrong password', credentials: users.invalidPassword, error: messages.login.invalidPassword },
    { name: 'empty credentials', credentials: users.empty, error: messages.login.invalidUsername },
  ];

  for (const { name, credentials, error } of invalidLogins) {
    test(`rejects ${name}`, async ({ loginPage, page }) => {
      await loginPage.login(credentials);

      await expect(page).toHaveURL(/\/login$/);
      await expect(loginPage.flashMessage).toContainText(error);
      await expect(loginPage.flashMessage).toHaveClass(/error/);
    });
  }
});

test.describe('Secure area access', () => {
  test('redirects anonymous visitors to the login page', async ({ secureAreaPage, loginPage, page }) => {
    await secureAreaPage.open();

    await expect(page).toHaveURL(/\/login$/);
    await expect(loginPage.flashMessage).toContainText(messages.login.loginRequired);
  });
});
