import { test as base } from '@playwright/test';
import { JsonPlaceholderClient } from '../api/JsonPlaceholderClient';
import {
  AddRemoveElementsPage,
  CheckboxesPage,
  ContextMenuPage,
  DropdownPage,
  DynamicContentPage,
  ForgotPasswordPage,
  HomePage,
  JavaScriptAlertsPage,
  LoginPage,
  SecureAreaPage,
} from '../pages';

interface PageFixtures {
  addRemoveElementsPage: AddRemoveElementsPage;
  checkboxesPage: CheckboxesPage;
  contextMenuPage: ContextMenuPage;
  dropdownPage: DropdownPage;
  dynamicContentPage: DynamicContentPage;
  forgotPasswordPage: ForgotPasswordPage;
  homePage: HomePage;
  javaScriptAlertsPage: JavaScriptAlertsPage;
  loginPage: LoginPage;
  secureAreaPage: SecureAreaPage;
}

interface ApiFixtures {
  api: JsonPlaceholderClient;
}

/**
 * Project-wide `test` with page objects and the API client injected as
 * fixtures. Specs import `test` and `expect` from here instead of
 * `@playwright/test`.
 */
export const test = base.extend<PageFixtures & ApiFixtures>({
  addRemoveElementsPage: async ({ page }, use) => use(new AddRemoveElementsPage(page)),
  checkboxesPage: async ({ page }, use) => use(new CheckboxesPage(page)),
  contextMenuPage: async ({ page }, use) => use(new ContextMenuPage(page)),
  dropdownPage: async ({ page }, use) => use(new DropdownPage(page)),
  dynamicContentPage: async ({ page }, use) => use(new DynamicContentPage(page)),
  forgotPasswordPage: async ({ page }, use) => use(new ForgotPasswordPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  javaScriptAlertsPage: async ({ page }, use) => use(new JavaScriptAlertsPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  secureAreaPage: async ({ page }, use) => use(new SecureAreaPage(page)),
  api: async ({ request }, use) => use(new JsonPlaceholderClient(request)),
});

export { expect } from '@playwright/test';
