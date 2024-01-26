import { describe, expect, it } from 'vitest';

import { ItemFactory } from '.';

describe('ItemFactory', () => {
  it('Returns correct path for id', () => {
    const item = ItemFactory({ id: '2d11f9d9-fbbe-4e0a-9a13-0999ca20bebc' });
    expect(item.path).toEqual('2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc');
  });
  it('Returns correct path for parentItem', () => {
    const item1 = ItemFactory({
      parentItem: ItemFactory({ id: '3d11f9d9-fbbe-4e0a-9a13-0999ca20bebc' }),
    });
    expect(item1.path).toContain('3d11f9d9_fbbe_4e0a_9a13_0999ca20bebc');
    const item2 = ItemFactory({
      id: '2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc',
      parentItem: ItemFactory({ id: '3d11f9d9-fbbe-4e0a-9a13-0999ca20bebc' }),
    });
    expect(item2.path).toEqual(
      '3d11f9d9_fbbe_4e0a_9a13_0999ca20bebc.2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc',
    );
  });
});
