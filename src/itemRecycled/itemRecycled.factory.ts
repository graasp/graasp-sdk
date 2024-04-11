import {
  FolderItemFactory,
  PackedFolderItemFactory,
} from '@/item/folderItem/folderItem.factory.js';
import { FolderItemType } from '@/item/folderItem/folderItem.js';
import { MemberFactory } from '@/member/factory.js';
import { Member } from '@/member/member.js';
import { faker } from '@faker-js/faker';

export const RecycledItemDataFactory = (args: {
  creator?: Member;
  createdAt?: string;
  item?: FolderItemType;
}) => {
  const createdAt: string =
    args.createdAt ?? faker.date.anytime().toISOString();
  return {
    id: faker.string.uuid(),
    creator: MemberFactory(args.creator),
    createdAt,
    item: FolderItemFactory(args.item),
  };
};

export const PackedRecycledItemDataFactory = (args: {
  creator?: Member;
  createdAt?: string;
  item?: FolderItemType;
}) => {
  const createdAt: string =
    args.createdAt ?? faker.date.anytime().toISOString();
  return {
    id: faker.string.uuid(),
    creator: MemberFactory(args.creator),
    createdAt,
    item: PackedFolderItemFactory(args.item),
  };
};
