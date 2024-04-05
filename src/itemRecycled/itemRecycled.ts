import { DiscriminatedItem } from '@/item/item.js';
import { PackedItem } from '@/item/packedItem.js';
import { Member } from '@/member/member.js';

export type RecycledItemData = {
  id: string;
  creator: Member;
  createdAt: string;
  item: DiscriminatedItem;
};

export type PackedRecycledItemData = {
  id: string;
  creator: Member;
  createdAt: string;
  item: PackedItem;
};
