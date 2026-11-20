import { expect, test } from '@fixtures';
import { readJson } from '@api/json';
import type { NewPost, Post } from '@api/types';

// JSONPlaceholder fakes writes: responses echo the request but nothing is persisted,
// so every test is independent and safe to run in parallel.
test.describe('Posts API - CRUD', () => {
  test('reads a single post', { tag: '@smoke' }, async ({ api }) => {
    const response = await api.getPost(1);

    expect(response.status()).toBe(200);
    const post = await readJson<Post>(response);
    expect(post).toEqual({
      id: 1,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('creates a post', async ({ api }) => {
    const newPost: NewPost = {
      userId: 1,
      title: 'Playwright demo post',
      body: 'Created by an automated API test.',
    };

    const response = await api.createPost(newPost);

    expect(response.status()).toBe(201);
    const created = await readJson<Post>(response);
    expect(created).toMatchObject(newPost);
    expect(created.id).toEqual(expect.any(Number));
  });

  test('replaces a post with PUT', async ({ api }) => {
    const replacement: Post = { id: 1, userId: 1, title: 'Replaced title', body: 'Replaced body.' };

    const response = await api.replacePost(1, replacement);

    expect(response.status()).toBe(200);
    expect(await readJson<unknown>(response)).toEqual(replacement);
  });

  test('updates part of a post with PATCH', async ({ api }) => {
    const response = await api.updatePost(1, { title: 'Only the title changed' });

    expect(response.status()).toBe(200);
    const updated = await readJson<Post>(response);
    expect(updated.title).toBe('Only the title changed');
    expect(updated.body).toEqual(expect.any(String));
    expect(updated.body.length).toBeGreaterThan(0);
  });

  test('deletes a post', async ({ api }) => {
    const response = await api.deletePost(1);

    expect(response.status()).toBe(200);
    expect(await readJson<unknown>(response)).toEqual({});
  });

  test('returns 404 for a post that does not exist', async ({ api }) => {
    const response = await api.getPost(999_999);

    expect(response.status()).toBe(404);
  });
});
