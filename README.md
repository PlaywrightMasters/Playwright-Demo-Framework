# Playwright Demo Framework

[![Playwright Tests](https://github.com/PlaywrightMasters/Playwright-Demo-Framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/PlaywrightMasters/Playwright-Demo-Framework/actions/workflows/playwright.yml)

An end-to-end test automation framework built with [Playwright](https://playwright.dev) and TypeScript.
It combines **UI tests** written with the Page Object Model and **API tests** written against Playwright's
`request` context, wired together with custom fixtures.

| Layer | Target                                                               | Playwright project              |
| ----- | -------------------------------------------------------------------- | ------------------------------- |
| UI    | [the-internet.herokuapp.com](https://the-internet.herokuapp.com)     | `chromium`, `firefox`, `webkit` |
| API   | [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) | `api` (no browser needed)       |

## Highlights

- **Page Object Model** – locators and user actions live in `src/pages`; assertions stay in the specs.
- **Custom fixtures** – page objects and the API client are injected into tests (`src/fixtures`), so specs need no setup boilerplate.
- **Typed API client** – `JsonPlaceholderClient` plus resource types in `src/api`.
- **Resilient locators** – role, label and text based locators with web-first assertions (`await expect(locator)…`).
- **Projects per layer** – API tests run without launching a browser; UI tests can run on Chromium, Firefox and WebKit.
- **Tags** – critical paths are tagged `@smoke` for a fast feedback run.
- **Environment overrides** – base URLs and the API response-time budget come from environment variables with safe defaults.
- **Quality gates** – strict TypeScript, type-aware ESLint (including `eslint-plugin-playwright`), Prettier and a Husky `pre-push` hook.
- **CI** – GitHub Actions runs static checks, then the `api` and `chromium` projects in parallel and uploads HTML reports.

## Project structure

```
.
├── .github/workflows/playwright.yml   # CI: static checks + API and Chromium test jobs
├── .husky/pre-push                    # typecheck, lint and block forgotten test.only before pushing
├── src/
│   ├── api/
│   │   ├── JsonPlaceholderClient.ts   # API client wrapping APIRequestContext
│   │   ├── json.ts                    # readJson<T>() helper
│   │   └── types.ts                   # Post, User, Comment, Photo, Todo …
│   ├── config/env.ts                  # environment variables and defaults
│   ├── fixtures/index.ts              # test.extend() with page objects + api client
│   ├── pages/                         # Page Object Model
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts / SecureAreaPage.ts
│   │   ├── CheckboxesPage.ts / DropdownPage.ts
│   │   ├── DynamicContentPage.ts / DynamicLoadingPage.ts
│   │   ├── ContextMenuPage.ts / JavaScriptAlertsPage.ts
│   │   ├── AddRemoveElementsPage.ts / ForgotPasswordPage.ts
│   │   └── index.ts                   # barrel export
│   └── utils/
│       ├── helpers.ts                 # randomString(), uniqueEmail()
│       └── testData.ts                # users, expected messages, options
├── tests/
│   └── sanity/
│       ├── api/                       # posts CRUD, query params, users, albums, todos
│       └── ui/                        # home, login, checkboxes, dropdown, alerts, dynamic pages …
├── eslint.config.mjs
├── playwright.config.ts
└── tsconfig.json                      # strict mode + path aliases (@fixtures, @pages, @api/*, @utils/*, @config/*)
```

## Getting started

Prerequisites: [Node.js](https://nodejs.org) 20 or newer (the repository pins 24 in `.nvmrc`) and Git.

```bash
git clone https://github.com/PlaywrightMasters/Playwright-Demo-Framework.git
cd Playwright-Demo-Framework
npm ci
npx playwright install chromium     # or: npx playwright install  (all browsers)
npm test
npm run report                      # open the HTML report
```

On Linux CI images use `npx playwright install --with-deps chromium` to install system dependencies too.

## Running tests

| Command                | What it does                                                 |
| ---------------------- | ------------------------------------------------------------ |
| `npm test`             | API + Chromium projects (the default suite)                  |
| `npm run test:api`     | API tests only – no browser required                         |
| `npm run test:chrome`  | UI tests on Chromium                                         |
| `npm run test:firefox` | UI tests on Firefox (`npx playwright install firefox` first) |
| `npm run test:webkit`  | UI tests on WebKit (`npx playwright install webkit` first)   |
| `npm run test:all`     | Every project, including Firefox and WebKit                  |
| `npm run test:smoke`   | Only tests tagged `@smoke`                                   |
| `npm run test:sanity`  | The `tests/sanity` suite on API + Chromium                   |
| `npm run test:headed`  | Chromium with a visible browser window                       |
| `npm run test:debug`   | Chromium with the Playwright Inspector                       |
| `npm run test:ui`      | Playwright UI mode                                           |
| `npm run test:list`    | List all tests without running them                          |
| `npm run report`       | Open the last HTML report                                    |
| `npm run codegen`      | Record new interactions against the demo site                |

Any Playwright CLI flag can be appended after `--`, for example `npm test -- --grep "login"` or
`npm run test:chrome -- tests/sanity/ui/login.spec.ts`.

## Quality checks

| Command             | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run typecheck` | `tsc --noEmit` with strict settings          |
| `npm run lint`      | ESLint with type-aware and Playwright rules  |
| `npm run format`    | Format every file with Prettier              |
| `npm run check`     | Typecheck + lint + format check (used by CI) |

The Husky `pre-push` hook runs `typecheck`, `lint` and `playwright test --forbid-only --list`, so a push fails
if the code does not compile, has lint errors or still contains a focused `test.only`.

## Configuration

`playwright.config.ts`:

- `api` project runs `tests/**/api/**/*.spec.ts` against `API_BASE_URL`; browser projects run `tests/**/ui/**/*.spec.ts` against `BASE_URL`.
- Fully parallel. On CI: 2 retries and 2 workers. Locally: no retries and an automatic worker count.
- Screenshots and videos are kept for failed tests; traces are recorded on the first retry.
- Reporters: `list` + `html` locally, plus `github` annotations on CI.

Environment variables (see `.env.example`; export them in your shell or CI – `.env` files are not loaded automatically):

| Variable                      | Default                                |
| ----------------------------- | -------------------------------------- |
| `BASE_URL`                    | `https://the-internet.herokuapp.com`   |
| `API_BASE_URL`                | `https://jsonplaceholder.typicode.com` |
| `API_RESPONSE_TIME_BUDGET_MS` | `5000`                                 |

## Writing a new test

1. Add a page object in `src/pages` that extends `BasePage`, sets `path`, and exposes locators and actions.
2. Export it from `src/pages/index.ts` and register a fixture for it in `src/fixtures/index.ts`.
3. Write the spec in `tests/sanity/ui` (or `tests/sanity/api` for API tests) and import `test`/`expect` from `@fixtures`:

```ts
import { expect, test } from '@fixtures';
import { messages, users } from '@utils/testData';

test('logs in with valid credentials', { tag: '@smoke' }, async ({ loginPage, secureAreaPage }) => {
  await loginPage.open();
  await loginPage.login(users.valid);

  await expect(secureAreaPage.flashMessage).toContainText(messages.login.success);
});
```

## Continuous integration

`.github/workflows/playwright.yml` runs on pushes and pull requests to `main` and can be started manually from the
**Actions** tab. It runs `npm run check`, then the `api` and `chromium` projects as separate jobs, and uploads each HTML
report as a build artifact for 14 days.

## Notes

- Both targets are public demo services. The `tomsmith` / `SuperSecretPassword!` account is the demo login published on
  the site itself, not a secret.
- JSONPlaceholder fakes write operations: `POST`, `PUT`, `PATCH` and `DELETE` return realistic responses but nothing is
  stored, so API tests are independent and parallel-safe.
- Tests depend on these external sites being reachable; an outage on their side shows up as failed tests here.
