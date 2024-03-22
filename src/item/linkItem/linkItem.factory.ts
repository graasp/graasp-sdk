import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PackedItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { PackedInformation } from '../packedItem.js';
import { LinkItemType } from './linkItem.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
import { faker } from '@faker-js/faker';

export const LinkItemFactory = (
  item: ItemFactoryInputType<LinkItemType> = {},
): ItemFactoryOutputType<LinkItemType> => {
  const newItem = PartialItemFactory<LinkItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.LINK,
    extra: item.extra ?? {
      [ItemType.LINK]: {
        html: faker.helpers.arrayElement([
          `<div>${faker.lorem.text()}</div>`,
          undefined,
        ]),
        icons: faker.helpers.arrayElement([[faker.internet.url()], undefined]),
        thumbnails: faker.helpers.arrayElement([
          [faker.internet.url()],
          undefined,
        ]),
        url: faker.internet.url(),
      },
    },
  };
};

export const PackedLinkItemFactory = (
  item: ItemFactoryInputType<LinkItemType> = {},
  packedInfo: Partial<PackedInformation> = {},
): PackedItemFactoryOutputType<LinkItemType> => {
  const newItem = LinkItemFactory(item);
  return {
    ...newItem,

    // default packed info
    permission: PermissionLevel.Admin,
    ...packedInfo,
  };
};
