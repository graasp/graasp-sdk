import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { buildLinkExtra, getLinkThumbnailUrl } from './linkItem.js';
import { ThumbnailSize } from '@/enums/thumbnailSizes.js';

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

  it('return icon for small size', () => {
    const extra = buildLinkExtra({
      url: 'url',
      thumbnails: ['thumbnail'],
      icons: ['icon'],
    });
    expect(getLinkThumbnailUrl(extra, ThumbnailSize.Small)).to.eq(
      extra[ItemType.LINK].icons![0],
    );
  });

  it('return thumbnail for small size if icon is not defined', () => {
    const extra = buildLinkExtra({
      url: 'url',
      thumbnails: ['thumbnail'],
    });
    expect(getLinkThumbnailUrl(extra, ThumbnailSize.Small)).to.eq(
      extra[ItemType.LINK].thumbnails![0],
    );
    const extra1 = buildLinkExtra({
      url: 'url',
      thumbnails: ['thumbnail'],
      icons: [],
    });
    expect(getLinkThumbnailUrl(extra1, ThumbnailSize.Small)).to.eq(
      extra1[ItemType.LINK].thumbnails![0],
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
    expect(getLinkThumbnailUrl(extra1)).to.eq(extra1[ItemType.LINK].icons![0]);
  });

  it('return undefined when nothing is defined', () => {
    const extra = buildLinkExtra({
      url: 'string',
      thumbnails: [],
      icons: [],
    });
    expect(getLinkThumbnailUrl(extra)).to.be.null;
    const extra1 = buildLinkExtra({ url: 'string', thumbnails: [] });
    expect(getLinkThumbnailUrl(extra1)).to.be.null;
    const extra2 = buildLinkExtra({ url: 'string' });
    expect(getLinkThumbnailUrl(extra2)).to.be.null;
    const extra3 = buildLinkExtra({ url: 'string', icons: [] });
    expect(getLinkThumbnailUrl(extra3)).to.be.null;
  });
});
