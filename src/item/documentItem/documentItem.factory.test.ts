import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { DocumentItemFactory } from './documentItem.factory.js';

describe('DocumentItemFactory', () => {
  it('Create different items', () => {
    const item1 = DocumentItemFactory();
    const item2 = DocumentItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create document item', () => {
    const item = DocumentItemFactory();
    expect(item.type).toEqual(ItemType.DOCUMENT);
    expect(item.extra.document.content.length).toBeGreaterThan(3);
  });
  it('Create document item with args', () => {
    const item = DocumentItemFactory({
      extra: { document: { content: 'content' } },
    });
    expect(item.type).toEqual(ItemType.DOCUMENT);
    expect(item.extra.document.content).toEqual('content');
  });
});
