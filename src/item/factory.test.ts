import { describe, expect, it } from 'vitest';

import { PackedInformationFactory, PartialItemFactory } from './factory.js';
import {
  FolderItemFactory,
  PackedFolderItemFactory,
} from './folderItem/folderItem.factory.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
import { ItemTagFactory } from '@/itemTag/itemTag.factory.js';
import { ItemTagType } from '@/itemTag/itemTag.js';

describe('Base Item Factory', () => {
  it('Returns correct path for id', () => {
    const item = PartialItemFactory({
      id: '2d11f9d9-fbbe-4e0a-9a13-0999ca20bebc',
    });
    expect(item.path).toEqual('2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc');
  });

  it('Returns correct path for parentItem', () => {
    const item1 = PartialItemFactory({
      parentItem: PartialItemFactory({
        id: '3d11f9d9-fbbe-4e0a-9a13-0999ca20bebc',
      }),
    });
    expect(item1.path).toContain('3d11f9d9_fbbe_4e0a_9a13_0999ca20bebc');
    const item2 = PartialItemFactory({
      id: '2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc',
      parentItem: PartialItemFactory({
        id: '3d11f9d9-fbbe-4e0a-9a13-0999ca20bebc',
      }),
    });
    expect(item2.path).toEqual(
      '3d11f9d9_fbbe_4e0a_9a13_0999ca20bebc.2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc',
    );
  });

  it('Allow null creator', () => {
    const item1 = PartialItemFactory({
      creator: null,
    });
    expect(item1.creator).toBeNull();
  });

  it('Default to hasThumbnail = false', () => {
    const item1 = PartialItemFactory({});
    expect(item1.settings.hasThumbnail).toBeFalsy();
  });

  it('Returns correct default displayName', () => {
    const item = PartialItemFactory({});
    expect(item.displayName).toBeDefined();
    expect(typeof item.displayName).toBe('string');
  });
});

describe('Packed Item Factory', () => {
  it('Returns correct default packed info', () => {
    const item = FolderItemFactory();
    const info = PackedInformationFactory({}, item);
    expect(info.permission).toEqual(PermissionLevel.Admin);
    expect(info.hidden).toBeUndefined();
    expect(info.public).toBeUndefined();
  });
  it('Returns correct packed info with given hidden tag', () => {
    const item = FolderItemFactory();
    const hiddenTag = { type: ItemTagType.Hidden, item };

    const info = PackedInformationFactory({ hiddenTag: hiddenTag }, item);
    expect(info.permission).toEqual(PermissionLevel.Admin);
    expect(info.hidden).toEqual(expect.objectContaining(hiddenTag));
    expect(info.public).toBeUndefined();
  });
  it('Returns correct packed info inheriting parent hidden tag', () => {
    const parent = FolderItemFactory();
    const hiddenTag = { type: ItemTagType.Hidden, item: parent };
    const parentItem = PackedFolderItemFactory(parent, {
      hiddenTag: hiddenTag,
    });
    const item = FolderItemFactory({ parentItem });
    const info = PackedInformationFactory({}, item, parentItem);
    expect(info.permission).toEqual(PermissionLevel.Admin);
    expect(info.hidden).toEqual(expect.objectContaining(hiddenTag));
    expect(info.public).toBeUndefined();
  });
  it('Returns correct packed info with given public tag', () => {
    const item = FolderItemFactory();
    const publicTag = { type: ItemTagType.Public, item };

    const info = PackedInformationFactory({ publicTag: publicTag }, item);
    expect(info.permission).toEqual(PermissionLevel.Admin);
    expect(info.public).toEqual(expect.objectContaining(publicTag));
    expect(info.hidden).toBeUndefined();
  });
  it('Returns correct packed info inheriting parent public tag', () => {
    const parent = FolderItemFactory();
    const publicTag = { type: ItemTagType.Public, item: parent };
    const parentItem = PackedFolderItemFactory(parent, {
      publicTag: publicTag,
    });
    const item = FolderItemFactory({ parentItem });
    const info = PackedInformationFactory({}, item, parentItem);
    expect(info.permission).toEqual(PermissionLevel.Admin);
    expect(info.public).toEqual(expect.objectContaining(publicTag));
    expect(info.hidden).toBeUndefined();
  });
});
