import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { CapsuleItemFactory } from './capsuleItem.factory.js';
import { MemberFactory } from '@/index.js';

describe('CapsuleItemFactory', () => {
  it('Create different items', () => {
    const item1 = CapsuleItemFactory();
    const item2 = CapsuleItemFactory();
    expect(item1).not.toEqual(item2);
  });

  it('Create capsule item', () => {
    const item = CapsuleItemFactory();
    expect(item.extra.folder).toEqual({ isCapsule: true });
    expect(item.type).toEqual(ItemType.FOLDER);
  });

  it('Create capsule item with args', () => {
    const creator = MemberFactory();
    const item = CapsuleItemFactory({
      creator,
      name: 'name',
      description: 'description',
      settings: { enableSaveActions: true },
    });
    expect(item.name).toEqual('name');
    expect(item.creator!.id).toEqual(creator.id);
    expect(item.description).toEqual('description');
    expect(item.extra.folder).toEqual({ isCapsule: true });
    expect(item.settings.enableSaveActions).toEqual(true);
    expect(item.type).toEqual(ItemType.FOLDER);
  });
});
