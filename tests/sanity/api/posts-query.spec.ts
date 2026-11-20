import { expect, test } from '@fixtures';
import { readJson } from '@api/json';
import { env } from '@config/env';
import type { Comment, Post } from '@api/types';

test.describe('Posts API - query parameters', () => {
  test('filters posts by userId', async ({ api }) => {
    const response = await api.getPosts({ userId: 1 });

    expect(response.ok()).toBeTruthy();
    const posts = await readJson<Post[]>(response);
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.userId).toBe(1);
    }
  });

  test('limits results with _limit', async ({ api }) => {
    const response = await api.getPosts({ _limit: 5 });

    expect(response.ok()).toBeTruthy();
    expect(await readJson<unknown>(response)).toHaveLength(5);
  });

  test('pages through results with _page and _limit', async ({ api }) => {
    const [firstPage, secondPage] = await Promise.all([
      api.getPosts({ _page: 1, _limit: 10 }),
      api.getPosts({ _page: 2, _limit: 10 }),
    ]);

    const firstIds = (await readJson<Post[]>(firstPage)).map((post) => post.id);
    const secondIds = (await readJson<Post[]>(secondPage)).map((post) => post.id);

    expect(firstIds).toHaveLength(10);
    expect(secondIds).toHaveLength(10);
    expect(firstIds.filter((id) => secondIds.includes(id))).toEqual([]);
  });

  test('returns JSON content type', async ({ api }) => {
    const response = await api.getPost(1);

    expect(response.headers()['content-type']).toContain('application/json');
  });

  test(`responds within ${env.apiResponseTimeBudgetMs} ms`, async ({ api }) => {
    const start = performance.now();
    const response = await api.getPosts();
    const elapsedMs = performance.now() - start;

    expect(response.ok()).toBeTruthy();
    expect(elapsedMs).toBeLessThan(env.apiResponseTimeBudgetMs);
  });
});

test.describe('Comments API - nested resources', () => {
  test('returns the comments of a post', async ({ api }) => {
    const response = await api.getPostComments(1);

    expect(response.ok()).toBeTruthy();
    const comments = await readJson<Comment[]>(response);
    expect(comments.length).toBeGreaterThan(0);
    for (const comment of comments) {
      expect(comment).toMatchObject({
        postId: 1,
        name: expect.any(String),
        body: expect.any(String),
      });
      expect(comment.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    }
  });
});
