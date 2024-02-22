import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { H5PItemFactory } from './h5pItem.factory.js';

describe('H5PItemFactory', () => {
  it('Create different items', () => {
    const item1 = H5PItemFactory();
    const item2 = H5PItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create h5p item', () => {
    const item = H5PItemFactory();
    expect(item.extra.h5p.contentId.length).toBeGreaterThan(10);
    expect(item.extra.h5p.h5pFilePath.length).toBeGreaterThan(3);
    expect(item.extra.h5p.contentFilePath.length).toBeGreaterThan(3);
    expect(item.type).toEqual(ItemType.H5P);
  });
  it('Create h5p item with args', () => {
    const item = H5PItemFactory({
      extra: {
        h5p: {
          contentFilePath: 'string',
          contentId: 'id',
          h5pFilePath: 'path',
        },
      },
    });
    expect(item.extra.h5p.contentId).toEqual('id');
    expect(item.extra.h5p.h5pFilePath).toEqual('path');
    expect(item.extra.h5p.contentFilePath).toEqual('string');
    expect(item.type).toEqual(ItemType.H5P);
  });
});
