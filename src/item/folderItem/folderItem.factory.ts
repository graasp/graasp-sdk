import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PackedInformationFactory,
  PackedInformationFactoryInput,
  PackedItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { FolderItemType } from './folderItem.js';

export const FolderItemFactory = (
  item: ItemFactoryInputType<FolderItemType> = {},
): ItemFactoryOutputType<FolderItemType> => {
  const newItem = PartialItemFactory({ ...item });
  return {
    ...newItem,
    type: ItemType.FOLDER,
    extra: item.extra ?? {
      [ItemType.FOLDER]: {},
    },
  };
};

export const PackedFolderItemFactory = (
  item: ItemFactoryInputType<FolderItemType> = {},
  packedInfo: PackedInformationFactoryInput = {},
): PackedItemFactoryOutputType<FolderItemType> => {
  const newItem = FolderItemFactory(item);
  const packed = PackedInformationFactory(packedInfo, newItem, item.parentItem);
  return {
    ...newItem,
    ...packed,
  };
};
