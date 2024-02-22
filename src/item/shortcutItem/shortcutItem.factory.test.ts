import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { ShortcutItemFactory } from './shortcutItem.factory.js';

describe('ShortcutItemFactory', () => {
  it('Create different items', () => {
    const item1 = ShortcutItemFactory();
    const item2 = ShortcutItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create etherpad item', () => {
    const item = ShortcutItemFactory();
    expect(item.extra.shortcut.target.length).toBeGreaterThan(3);
    expect(item.type).toEqual(ItemType.SHORTCUT);
  });
  it('Create shortcut item with args', () => {
    const item = ShortcutItemFactory({ extra: { shortcut: { target: 'd' } } });
    expect(item.extra.shortcut.target).toEqual('d');
    expect(item.type).toEqual(ItemType.SHORTCUT);
  });
});
