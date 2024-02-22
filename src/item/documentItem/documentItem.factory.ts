import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { DocumentItemType } from './documentItem.js';
import { faker } from '@faker-js/faker';

export const DocumentItemFactory = (
  item: ItemFactoryInputType<DocumentItemType> = {},
): ItemFactoryOutputType<DocumentItemType> => {
  const newItem = PartialItemFactory<DocumentItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.DOCUMENT,
    extra: item.extra ?? {
      [ItemType.DOCUMENT]: {
        content: `<div>${faker.lorem.text()}</div>`,
      },
    },
  };
};
