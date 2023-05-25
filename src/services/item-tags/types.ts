import { Item, Member } from '../index';
import { UUID } from '@/types';

export enum ItemTagType {
  Public = 'public',
  Hidden = 'hidden',
}

export type ItemTag = {
  id: UUID;
  item: Item;
  type: `${ItemTagType}` | ItemTagType;
  createdAt: Date;
  creator: Member;
};
