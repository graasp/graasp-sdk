import { DiscriminatedItem } from '@/item/item.js';
import { Member } from '@/member/member.js';
import { UUID } from '@/types.js';

export enum ItemVisibilityType {
  Public = 'public',
  Hidden = 'hidden',
}

export type ItemVisibility = {
  id: UUID;
  item: DiscriminatedItem;
  type: `${ItemVisibilityType}` | ItemVisibilityType;
  createdAt: string;
  creator: Member;
};
