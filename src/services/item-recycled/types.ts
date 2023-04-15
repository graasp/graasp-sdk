import { Item, Member } from '../index';

export type RecycledItemData = {
  id: string;
  creator: Member;
  createdAt: Date;
  item: Item;
};
