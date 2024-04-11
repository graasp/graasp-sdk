import { ItemFactoryInputType } from '@/item/factory.js';
import {
  FolderItemFactory,
  PackedFolderItemFactory,
} from '@/item/folderItem/folderItem.factory.js';
import { FolderItemType } from '@/item/folderItem/folderItem.js';
import { faker } from '@faker-js/faker';

export const ItemBookmarkFactory = (
  args: {
    createdAt?: string;
    item?: ItemFactoryInputType<FolderItemType>;
  } = {},
) => {
  const createdAt: string =
    args.createdAt ?? faker.date.anytime().toISOString();
  return {
    id: faker.string.uuid(),
    createdAt,
    item: FolderItemFactory(args.item),
  };
};

export const PackedItemBookmarkFactory = (
  args: {
    createdAt?: string;
    item?: ItemFactoryInputType<FolderItemType>;
  } = {},
) => {
  const createdAt: string =
    args.createdAt ?? faker.date.anytime().toISOString();
  return {
    id: faker.string.uuid(),
    createdAt,
    item: PackedFolderItemFactory(args.item),
  };
};
