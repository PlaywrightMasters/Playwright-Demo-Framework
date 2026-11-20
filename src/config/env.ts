/**
 * Runtime configuration resolved from environment variables.
 * Every value has a safe default so the suite runs without any setup.
 */
function readNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw.trim() === '') return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Environment variable ${name} must be a positive number, received "${raw}"`);
  }
  return value;
}

export const env = {
  /** Web application under test (UI projects). */
  baseUrl: process.env.BASE_URL ?? 'https://the-internet.herokuapp.com',
  /** REST API under test (api project). */
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
  /** Upper bound, in milliseconds, used by API response-time checks. */
  apiResponseTimeBudgetMs: readNumber('API_RESPONSE_TIME_BUDGET_MS', 5000),
  isCI: !!process.env.CI,
} as const;
