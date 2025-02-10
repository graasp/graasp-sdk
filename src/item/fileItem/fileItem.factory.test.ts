import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { FileItemFactory } from './fileItem.factory.js';

describe('FileItemFactory', () => {
  it('Create different items', () => {
    const item1 = FileItemFactory();
    const item2 = FileItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create local file item', () => {
    const item = FileItemFactory();
    expect(item.extra.file.name.length).toBeGreaterThan(3);
    expect(item.extra.file.mimetype.length).toBeGreaterThan(3);
    expect(item.extra.file.path.length).toBeGreaterThan(3);
    if (item.extra.file.altText) {
      expect(item.extra.file.altText.length).toBeGreaterThan(1);
    }
    expect(item.extra.file.content.length).toBeGreaterThan(3);
    expect(item.type).toEqual(ItemType.FILE);
    expect(item.extra.file.size).toBeGreaterThanOrEqual(1);
  });
  it('Create local file item with args', () => {
    const item = FileItemFactory({
      extra: {
        file: {
          name: 'name',
          content: 'content',
          mimetype: 'mimetype',
          path: 'path',
          size: 1,
        },
      },
    });
    expect(item.extra.file.name).toEqual('name');
    expect(item.extra.file.mimetype).toEqual('mimetype');
    expect(item.extra.file.path).toEqual('path');
    expect(item.extra.file.altText).toBeUndefined();
    expect(item.extra.file.content).toEqual('content');
    expect(item.type).toEqual(ItemType.FILE);
    expect(item.extra.file.size).toEqual(1);
  });
});
