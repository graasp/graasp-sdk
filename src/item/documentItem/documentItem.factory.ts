import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { PackedInformation } from '../packedItem.js';
import { DocumentItemType } from './documentItem.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
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

export const PackedDocumentItemFactory = (
  item: ItemFactoryInputType<DocumentItemType> = {},
  packedInfo: Partial<PackedInformation>,
): ItemFactoryOutputType<DocumentItemType> => {
  const newItem = DocumentItemFactory(item);
  return {
    ...newItem,

    // default packed info
    permission: PermissionLevel.Admin,
    ...packedInfo,
  };
};
