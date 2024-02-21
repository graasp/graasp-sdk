import { DiscriminatedItem } from '@/item/item.js';
import { Member } from '@/member/member.js';

export type RecycledItemData = {
  id: string;
  creator: Member;
  createdAt: string;
  item: DiscriminatedItem;
};
