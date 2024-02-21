import { DiscriminatedItem } from '@/item/item.js';
import { Member } from '@/member/member.js';
import { UUID } from '@/types.js';

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
