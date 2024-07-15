import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { buildLinkExtra, getLinkThumbnailUrl } from './linkItem.js';

describe('getLinkThumbnailUrl', () => {
  it('returns thumbnail over icon', () => {
    const extra = buildLinkExtra({
      url: 'url',
      thumbnails: ['thumbnai'],
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
    expect(getLinkThumbnailUrl(extra1)).to.eq(extra[ItemType.LINK].icons![0]);
  });

  it('returns undefined when nothing is defined', () => {
    const extra = buildLinkExtra({
      url: 'string',
      thumbnails: [],
      icons: [],
    });
    expect(getLinkThumbnailUrl(extra)).to.be.undefined;
    const extra1 = buildLinkExtra({ url: 'string', thumbnails: [] });
    expect(getLinkThumbnailUrl(extra1)).to.be.undefined;
    const extra2 = buildLinkExtra({ url: 'string' });
    expect(getLinkThumbnailUrl(extra2)).to.be.undefined;
    const extra3 = buildLinkExtra({ url: 'string', icons: [] });
    expect(getLinkThumbnailUrl(extra3)).to.be.undefined;
  });
});
