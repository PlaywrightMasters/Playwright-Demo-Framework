import { expect, test } from '@fixtures';

test.describe('Dynamic content', () => {
  test('renders three rows that each have an avatar and text', async ({ dynamicContentPage }) => {
    await dynamicContentPage.open();

    await expect(dynamicContentPage.rows).toHaveCount(3);
    for (const row of await dynamicContentPage.readRows()) {
      expect(row.avatar).toMatch(/\/img\/avatars\/.+\.jpg$/);
      expect(row.text.length).toBeGreaterThan(0);
    }
  });

  test('changes content after a reload', async ({ dynamicContentPage }) => {
    await dynamicContentPage.open();
    const before = await dynamicContentPage.readRows();

    // Content is random, so an identical page is possible but unlikely; reload until it differs.
    await expect(async () => {
      await dynamicContentPage.reload();
      const after = await dynamicContentPage.readRows();
      expect(after).not.toEqual(before);
    }).toPass({ timeout: 20_000 });
  });

  test('keeps the first two rows unchanged in static mode', async ({ dynamicContentPage }) => {
    await dynamicContentPage.openWithStaticContent();
    const before = await dynamicContentPage.readRows();

    await dynamicContentPage.reload();
    const after = await dynamicContentPage.readRows();

    expect(after).toHaveLength(3);
    expect(after.slice(0, 2)).toEqual(before.slice(0, 2));
  });
});
