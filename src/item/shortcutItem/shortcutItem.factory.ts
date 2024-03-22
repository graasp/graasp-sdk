import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PackedItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { PackedInformation } from '../packedItem.js';
import { ShortcutItemType } from './shortcutItem.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
import { faker } from '@faker-js/faker';

export const ShortcutItemFactory = (
  item: ItemFactoryInputType<ShortcutItemType> = {},
): ItemFactoryOutputType<ShortcutItemType> => {
  const newItem = PartialItemFactory<ShortcutItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.SHORTCUT,
    extra: item.extra ?? {
      [ItemType.SHORTCUT]: {
        target: faker.string.uuid(),
      },
    },
  };
};

export const PackedShortcutItemFactory = (
  item: ItemFactoryInputType<ShortcutItemType> = {},
  packedInfo: Partial<PackedInformation> = {},
): PackedItemFactoryOutputType<ShortcutItemType> => {
  const newItem = ShortcutItemFactory(item);
  return {
    ...newItem,

    // default packed info
    permission: PermissionLevel.Admin,
    ...packedInfo,
  };
};
