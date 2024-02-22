import { describe, expect, it } from 'vitest';

import { PartialItemFactory } from './factory.js';

describe('Base Item Factory', () => {
  it('Returns correct path for id', () => {
    const item = PartialItemFactory({
      id: '2d11f9d9-fbbe-4e0a-9a13-0999ca20bebc',
    });
    expect(item.path).toEqual('2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc');
  });

  it('Returns correct path for parentItem', () => {
    const item1 = PartialItemFactory({
      parentItem: PartialItemFactory({
        id: '3d11f9d9-fbbe-4e0a-9a13-0999ca20bebc',
      }),
    });
    expect(item1.path).toContain('3d11f9d9_fbbe_4e0a_9a13_0999ca20bebc');
    const item2 = PartialItemFactory({
      id: '2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc',
      parentItem: PartialItemFactory({
        id: '3d11f9d9-fbbe-4e0a-9a13-0999ca20bebc',
      }),
    });
    expect(item2.path).toEqual(
      '3d11f9d9_fbbe_4e0a_9a13_0999ca20bebc.2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc',
    );
  });

  it('Allow null creator', () => {
    const item1 = PartialItemFactory({
      creator: null,
    });
    expect(item1.creator).toBeNull();
  });

  it('Default to hasThumbnail = false', () => {
    const item1 = PartialItemFactory({});
    expect(item1.settings.hasThumbnail).toBeFalsy();
  });
});
