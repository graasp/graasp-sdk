import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PackedInformationFactory,
  PackedInformationFactoryInput,
  PackedItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { H5PItemType } from './h5pItem.js';
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
  packedInfo: PackedInformationFactoryInput = {},
): PackedItemFactoryOutputType<H5PItemType> => {
  const newItem = H5PItemFactory(item);
  const packed = PackedInformationFactory(packedInfo, newItem, item.parentItem);
  return {
    ...newItem,
    ...packed,
  };
};
