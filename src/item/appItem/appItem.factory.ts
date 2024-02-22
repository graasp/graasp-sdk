import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
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
        settings: {},
      },
    },
  };
};
