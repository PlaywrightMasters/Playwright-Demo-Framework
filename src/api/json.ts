import type { APIResponse } from '@playwright/test';

/**
 * Parses a response body as JSON and types it as `T`.
 * The cast is a test-side expectation, not runtime validation: pair it with
 * assertions on the fields the test relies on.
 */
export async function readJson<T>(response: APIResponse): Promise<T> {
  return (await response.json()) as T;
}
