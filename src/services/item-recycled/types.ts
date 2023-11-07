import { DiscriminatedItem, Member } from '../index';

export type RecycledItemData = {
  id: string;
  creator: Member;
  createdAt: string;
  item: DiscriminatedItem;
};
