import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { EtherpadItemType } from './etherpadItem.js';
import { faker } from '@faker-js/faker';

export const EtherpadItemFactory = (
  item: ItemFactoryInputType<EtherpadItemType> = {},
): ItemFactoryOutputType<EtherpadItemType> => {
  const newItem = PartialItemFactory<EtherpadItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.ETHERPAD,
    extra: item.extra ?? {
      [ItemType.ETHERPAD]: {
        padID: faker.string.uuid(),
        groupID: faker.string.uuid(),
      },
    },
  };
};
