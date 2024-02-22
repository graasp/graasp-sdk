import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { FolderItemFactory } from './folderItem.factory.js';
import { MemberFactory } from '@/index.js';

describe('FolderItemFactory', () => {
  it('Create different items', () => {
    const item1 = FolderItemFactory();
    const item2 = FolderItemFactory();
    expect(item1).not.toEqual(item2);
  });

  it('Create folder item', () => {
    const item = FolderItemFactory();
    expect(item.extra.folder).toEqual({ childrenOrder: [] });
    expect(item.type).toEqual(ItemType.FOLDER);
  });

  it('Create folder item with args', () => {
    const creator = MemberFactory();
    const item = FolderItemFactory({
      creator,
      name: 'name',
      description: 'description',
      extra: { folder: { childrenOrder: ['uuid'] } },
      settings: { enableSaveActions: true },
    });
    expect(item.name).toEqual('name');
    expect(item.creator!.id).toEqual(creator.id);
    expect(item.description).toEqual('description');
    expect(item.extra.folder).toEqual({ childrenOrder: ['uuid'] });
    expect(item.settings.enableSaveActions).toEqual(true);
    expect(item.type).toEqual(ItemType.FOLDER);
  });
});
