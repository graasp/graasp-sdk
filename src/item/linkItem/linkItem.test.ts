import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { buildLinkExtra, getLinkThumbnailUrl } from './linkItem.js';

describe('getLinkThumbnailUrl', () => {
  it('return thumbnail over icon', () => {
    const extra = buildLinkExtra({
      url: 'url',
      thumbnails: ['thumbnail'],
      icons: ['icon'],
    });
    expect(getLinkThumbnailUrl(extra)).to.eq(
      extra[ItemType.LINK].thumbnails![0],
    );
  });

  it('return icon for empty thumbnail', () => {
    const extra = buildLinkExtra({
      url: 'url',
      icons: ['icon'],
    });
    expect(getLinkThumbnailUrl(extra)).to.eq(extra[ItemType.LINK].icons![0]);
    const extra1 = {
      [ItemType.LINK]: {
        url: 'url',
        thumbnails: [],
        icons: ['icon'],
      },
    };
    expect(getLinkThumbnailUrl(extra1)).to.eq(extra1[ItemType.LINK].icons[0]);
  });

  it('return null when nothing is defined', () => {
    const extra = buildLinkExtra({
      url: 'string',
      thumbnails: [],
      icons: [],
    });
    expect(getLinkThumbnailUrl(extra)).toBeUndefined();

    const extra1 = buildLinkExtra({ url: 'string', thumbnails: [] });
    expect(getLinkThumbnailUrl(extra1)).toBeUndefined();

    const extra2 = buildLinkExtra({ url: 'string' });
    expect(getLinkThumbnailUrl(extra2)).toBeUndefined();

    const extra3 = buildLinkExtra({ url: 'string', icons: [] });
    expect(getLinkThumbnailUrl(extra3)).toBeUndefined();
  });
});
