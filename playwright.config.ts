import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

/** Matches spec files that live in a `ui` or `api` folder (works with both / and \ separators). */
const UI_SPECS = /[\\/]ui[\\/].*\.spec\.ts$/;
const API_SPECS = /[\\/]api[\\/].*\.spec\.ts$/;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: env.isCI,
  retries: env.isCI ? 2 : 0,
  workers: env.isCI ? 2 : undefined,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  reporter: env.isCI ? [['github'], ['list'], ['html', { open: 'never' }]] : [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: env.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'api',
      testMatch: API_SPECS,
      use: {
        baseURL: env.apiBaseUrl,
        extraHTTPHeaders: {
          Accept: 'application/json',
        },
      },
    },
    {
      name: 'chromium',
      testMatch: UI_SPECS,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: UI_SPECS,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testMatch: UI_SPECS,
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
