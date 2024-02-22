import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { ShortcutItemType } from './shortcutItem.js';
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
