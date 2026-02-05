import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PackedInformationFactory,
  PackedInformationFactoryInput,
  PackedItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { AppItemType } from './appItem.js';
import { faker } from '@faker-js/faker';

export const AppItemFactory = (
  item: ItemFactoryInputType<AppItemType> = {},
): ItemFactoryOutputType<AppItemType> => {
  const newItem = PartialItemFactory({ ...item, type: ItemType.APP });
  return {
    ...newItem,
    type: ItemType.APP,
    extra: item.extra ?? {
      [ItemType.APP]: {
        url: faker.internet.url(),
      },
    },
  };
};

export const PackedAppItemFactory = (
  item: ItemFactoryInputType<AppItemType> = {},
  packedInfo: PackedInformationFactoryInput = {},
): PackedItemFactoryOutputType<AppItemType> => {
  const newItem = AppItemFactory(item);
  const packed = PackedInformationFactory(packedInfo, newItem, item.parentItem);
  return {
    ...newItem,
    ...packed,
  };
};
