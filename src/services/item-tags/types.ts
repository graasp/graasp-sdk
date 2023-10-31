import { DiscriminatedItem, Member } from '../index';
import { UUID } from '@/types';

export enum ItemTagType {
  Public = 'public',
  Hidden = 'hidden',
}

export type ItemTag = {
  id: UUID;
  item: DiscriminatedItem;
  type: `${ItemTagType}` | ItemTagType;
  createdAt: string;
  creator: Member;
};
