const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/** Returns a random alphanumeric string of the requested length. */
export function randomString(length: number): string {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError(`length must be a non-negative integer, received ${length}`);
  }
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ALPHANUMERIC.charAt(Math.floor(Math.random() * ALPHANUMERIC.length));
  }
  return result;
}

/** Returns an e-mail address on the reserved example.com domain that is unique per call. */
export function uniqueEmail(prefix = 'qa'): string {
  return `${prefix}.${Date.now()}.${randomString(6).toLowerCase()}@example.com`;
}
