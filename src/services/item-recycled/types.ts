import { DiscriminatedItem, Member } from '../index';

export type RecycledItemData = {
  id: string;
  creator: Member;
  createdAt: Date;
  item: DiscriminatedItem;
};
