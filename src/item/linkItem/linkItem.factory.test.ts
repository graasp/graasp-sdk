import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { LinkItemFactory } from './linkItem.factory.js';

describe('EmbeddedLinkItemFactory', () => {
  it('Create different items', () => {
    const item1 = LinkItemFactory();
    const item2 = LinkItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create link item', () => {
    const item = LinkItemFactory();
    if (item.extra.embeddedLink.html) {
      expect(item.extra.embeddedLink.html.length).toBeGreaterThan(3);
    }
    if (item.extra.embeddedLink.icons) {
      expect(item.extra.embeddedLink.icons[0].length).toBeGreaterThan(3);
    }
    if (item.extra.embeddedLink.thumbnails) {
      expect(item.extra.embeddedLink.thumbnails[0].length).toBeGreaterThan(3);
    }
    expect(item.extra.embeddedLink.url.length).toBeGreaterThan(3);
    expect(item.type).toEqual(ItemType.LINK);
  });
  it('Create link item with args', () => {
    const item = LinkItemFactory({
      extra: {
        embeddedLink: {
          html: 'html',
          icons: ['icon'],
          thumbnails: ['thumbnail'],
          url: 'url',
        },
      },
    });
    expect(item.extra.embeddedLink.html).toEqual('html');
    expect(item.extra.embeddedLink.icons![0]).toEqual('icon');
    expect(item.extra.embeddedLink.thumbnails![0]).toEqual('thumbnail');
    expect(item.type).toEqual(ItemType.LINK);
    expect(item.extra.embeddedLink.url).toEqual('url');
  });
});
