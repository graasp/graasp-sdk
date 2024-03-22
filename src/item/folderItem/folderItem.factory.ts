import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PackedItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { PackedInformation } from '../packedItem.js';
import { FolderItemType } from './folderItem.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';

export const FolderItemFactory = (
  item: ItemFactoryInputType<FolderItemType> = {},
): ItemFactoryOutputType<FolderItemType> => {
  const newItem = PartialItemFactory({ ...item });
  return {
    ...newItem,
    type: ItemType.FOLDER,
    extra: item.extra ?? {
      [ItemType.FOLDER]: {
        childrenOrder: [],
      },
    },
  };
};

export const PackedFolderItemFactory = (
  item: ItemFactoryInputType<FolderItemType> = {},
  packedInfo: Partial<PackedInformation> = {},
): PackedItemFactoryOutputType<FolderItemType> => {
  const newItem = FolderItemFactory(item);
  return {
    ...newItem,

    // default packed info
    permission: PermissionLevel.Admin,
    ...packedInfo,
  };
};
