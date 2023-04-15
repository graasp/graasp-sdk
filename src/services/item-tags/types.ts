import { Item, Member } from '../index';
import { UUID } from '@/types';

export enum ItemTagType {
  PUBLIC = 'public',
  HIDDEN = 'hidden',
}

export type ItemTag = {
  id: UUID;
  item: Item;
  type: ItemTagType;
  createdAt: Date;
  creator: Member;
};
