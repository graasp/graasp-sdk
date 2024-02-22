import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
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
      [ItemType.FOLDER]: {
        childrenOrder: [],
      },
    },
  };
};
