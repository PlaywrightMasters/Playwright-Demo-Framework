import { expect, test } from '@fixtures';
import { readJson } from '@api/json';
import type { Post, User } from '@api/types';

test.describe('Users API', () => {
  test('lists all users', { tag: '@smoke' }, async ({ api }) => {
    const response = await api.getUsers();

    expect(response.status()).toBe(200);
    const users = await readJson<User[]>(response);
    expect(users).toHaveLength(10);
    expect(new Set(users.map((user) => user.id)).size).toBe(users.length);
  });

  test('returns a single user with contact details', async ({ api }) => {
    const response = await api.getUser(1);

    expect(response.status()).toBe(200);
    const user = await readJson<User>(response);
    expect(user).toMatchObject({
      id: 1,
      name: expect.any(String),
      username: expect.any(String),
      email: expect.stringContaining('@'),
      phone: expect.any(String),
      address: {
        city: expect.any(String),
        geo: { lat: expect.any(String), lng: expect.any(String) },
      },
      company: { name: expect.any(String) },
    });
  });

  test('returns 404 for a user that does not exist', async ({ api }) => {
    const response = await api.getUser(999);

    expect(response.status()).toBe(404);
  });

  test("returns a user's posts through the nested resource", async ({ api }) => {
    const response = await api.getUserPosts(1);

    expect(response.ok()).toBeTruthy();
    const posts = await readJson<Post[]>(response);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((post) => post.userId === 1)).toBe(true);
  });
});
