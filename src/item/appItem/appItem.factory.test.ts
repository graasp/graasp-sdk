import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { AppItemFactory } from './appItem.factory.js';

describe('AppItemFactory', () => {
  it('Create different items', () => {
    const item1 = AppItemFactory();
    const item2 = AppItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create app item', () => {
    const item = AppItemFactory();
    expect(item.extra.app.url).toContain('http');
    expect(item.type).toEqual(ItemType.APP);
  });
  it('Create app item with args', () => {
    const item = AppItemFactory({
      name: 'name',
      description: 'description',
      extra: { app: { url: 'url' } },
    });
    expect(item.extra.app.url).toEqual('url');
    expect(item.name).toEqual('name');
    expect(item.description).toEqual('description');
    expect(item.type).toEqual(ItemType.APP);
  });
});
