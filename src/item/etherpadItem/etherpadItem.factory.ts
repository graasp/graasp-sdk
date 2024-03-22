import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { PackedInformation } from '../packedItem.js';
import { EtherpadItemType } from './etherpadItem.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
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

export const PackedEtherpadItemFactory = (
  item: ItemFactoryInputType<EtherpadItemType> = {},
  packedInfo: Partial<PackedInformation>,
): ItemFactoryOutputType<EtherpadItemType> => {
  const newItem = EtherpadItemFactory(item);
  return {
    ...newItem,

    // default packed info
    permission: PermissionLevel.Admin,
    ...packedInfo,
  };
};
