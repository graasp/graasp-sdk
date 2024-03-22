import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { PackedInformation } from '../packedItem.js';
import { AppItemType } from './appItem.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
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
        settings: {},
      },
    },
  };
};

export const PackedAppItemFactory = (
  item: ItemFactoryInputType<AppItemType> = {},
  packedInfo: Partial<PackedInformation>,
): ItemFactoryOutputType<AppItemType> => {
  const newItem = AppItemFactory(item);
  return {
    ...newItem,

    // default packed info
    permission: PermissionLevel.Admin,
    ...packedInfo,
  };
};
