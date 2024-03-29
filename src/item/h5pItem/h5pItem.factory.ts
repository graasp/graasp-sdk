import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PackedItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { PackedInformation } from '../packedItem.js';
import { H5PItemType } from './h5pItem.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
import { faker } from '@faker-js/faker';

export const H5PItemFactory = (
  item: ItemFactoryInputType<H5PItemType> = {},
): ItemFactoryOutputType<H5PItemType> => {
  const newItem = PartialItemFactory<H5PItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.H5P,
    extra: item.extra ?? {
      [ItemType.H5P]: {
        contentId: faker.string.uuid(),
        h5pFilePath: faker.system.filePath(),
        contentFilePath: faker.system.filePath(),
      },
    },
  };
};

export const PackedH5PItemFactory = (
  item: ItemFactoryInputType<H5PItemType> = {},
  packedInfo: Partial<PackedInformation> = {},
): PackedItemFactoryOutputType<H5PItemType> => {
  const newItem = H5PItemFactory(item);
  return {
    ...newItem,

    // default packed info
    permission: PermissionLevel.Admin,
    ...packedInfo,
  };
};
