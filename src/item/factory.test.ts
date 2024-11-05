import { describe, expect, it } from 'vitest';

import { PackedInformationFactory, PartialItemFactory } from './factory.js';
import {
  FolderItemFactory,
  PackedFolderItemFactory,
} from './folderItem/folderItem.factory.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
import { ItemVisibilityType } from '@/itemVisibility/itemVisibility.js';

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
  it('Return path supplied', () => {
    const itemPath =
      '2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc.2d11f9d9_fbbe_4e0a_9a13_0999ca20beba';
    const item = PartialItemFactory({
      id: '2d11f9d9-fbbe-4e0a-9a13-0999ca20bebc',
      path: itemPath,
    });
    expect(item.path).toEqual(itemPath);
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
  it('Returns correct packed info with given hidden visibility', () => {
    const item = FolderItemFactory();
    const hiddenVisibility = { type: ItemVisibilityType.Hidden, item };

    const info = PackedInformationFactory(
      { hiddenVisibility: hiddenVisibility },
      item,
    );
    expect(info.permission).toEqual(PermissionLevel.Admin);
    expect(info.hidden).toEqual(expect.objectContaining(hiddenVisibility));
    expect(info.public).toBeUndefined();
  });
  it('Returns correct packed info inheriting parent hidden visibility', () => {
    const parent = FolderItemFactory();
    const hiddenVisibility = { type: ItemVisibilityType.Hidden, item: parent };
    const parentItem = PackedFolderItemFactory(parent, {
      hiddenVisibility: hiddenVisibility,
    });
    const item = FolderItemFactory({ parentItem });
    const info = PackedInformationFactory({}, item, parentItem);
    expect(info.permission).toEqual(PermissionLevel.Admin);
    expect(info.hidden).toEqual(expect.objectContaining(hiddenVisibility));
    expect(info.public).toBeUndefined();
  });
  it('Returns correct packed info with given public visibility', () => {
    const item = FolderItemFactory();
    const publicVisibility = { type: ItemVisibilityType.Public, item };

    const info = PackedInformationFactory(
      { publicVisibility: publicVisibility },
      item,
    );
    expect(info.permission).toEqual(PermissionLevel.Admin);
    expect(info.public).toEqual(expect.objectContaining(publicVisibility));
    expect(info.hidden).toBeUndefined();
  });
  it('Returns correct packed info inheriting parent public visibility', () => {
    const parent = FolderItemFactory();
    const publicVisibility = { type: ItemVisibilityType.Public, item: parent };
    const parentItem = PackedFolderItemFactory(parent, {
      publicVisibility: publicVisibility,
    });
    const item = FolderItemFactory({ parentItem });
    const info = PackedInformationFactory({}, item, parentItem);
    expect(info.permission).toEqual(PermissionLevel.Admin);
    expect(info.public).toEqual(expect.objectContaining(publicVisibility));
    expect(info.hidden).toBeUndefined();
  });
});
