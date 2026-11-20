import { expect, test } from '@fixtures';
import { readJson } from '@api/json';
import type { Photo } from '@api/types';

test.describe('Albums API', () => {
  test('returns the photos of an album', async ({ api }) => {
    const response = await api.getAlbumPhotos(1);

    expect(response.status()).toBe(200);
    const photos = await readJson<Photo[]>(response);
    expect(photos.length).toBeGreaterThan(0);
    for (const photo of photos) {
      expect(photo).toMatchObject({
        albumId: 1,
        id: expect.any(Number),
        title: expect.any(String),
      });
      expect(photo.url).toMatch(/^https?:\/\//);
      expect(photo.thumbnailUrl).toMatch(/^https?:\/\//);
    }
  });
});
