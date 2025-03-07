import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PackedInformationFactory,
  PackedInformationFactoryInput,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { EtherpadItemType, EtherpadPermission } from './etherpadItem.js';
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
        readerPermission: faker.helpers.arrayElement([
          EtherpadPermission.Read,
          EtherpadPermission.Write,
          undefined,
        ]),
      },
    },
  };
};

export const PackedEtherpadItemFactory = (
  item: ItemFactoryInputType<EtherpadItemType> = {},
  packedInfo: PackedInformationFactoryInput = {},
): ItemFactoryOutputType<EtherpadItemType> => {
  const newItem = EtherpadItemFactory(item);
  const packed = PackedInformationFactory(packedInfo, newItem, item.parentItem);
  return {
    ...newItem,
    ...packed,
  };
};
