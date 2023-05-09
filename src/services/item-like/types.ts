import { Item, Member } from '../index';
import { UUID } from '@/types';

export type ItemLike = {
  id: UUID;
  item: Item;
  creator: Member;
  createdAt: Date;
};
