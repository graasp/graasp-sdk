import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { EtherpadItemFactory } from './etherpadItem.factory.js';

describe('EtherpadItemFactory', () => {
  it('Create different items', () => {
    const item1 = EtherpadItemFactory();
    const item2 = EtherpadItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create etherpad item', () => {
    const item = EtherpadItemFactory();
    expect(item.extra.etherpad.padID.length).toBeGreaterThan(3);
    expect(item.type).toEqual(ItemType.ETHERPAD);
    expect(item.extra.etherpad.groupID.length).toBeGreaterThan(3);
  });
  it('Create etherpad item with args', () => {
    const item = EtherpadItemFactory({
      extra: { etherpad: { groupID: 'id', padID: 'padId' } },
    });
    expect(item.extra.etherpad.padID).toEqual('padId');
    expect(item.type).toEqual(ItemType.ETHERPAD);
    expect(item.extra.etherpad.groupID).toEqual('id');
  });
});
