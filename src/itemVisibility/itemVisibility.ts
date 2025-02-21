import { DiscriminatedItem } from '@/item/item.js';
import { Member } from '@/member/member.js';
import { UnionOfConst } from '@/typeUtils.js';
import { UUID } from '@/types.js';

export const ItemVisibilityType = {
  Public: 'public',
  Hidden: 'hidden',
} as const;
export type ItemVisibilityOptionsType = UnionOfConst<typeof ItemVisibilityType>;

export type ItemVisibility = {
  id: UUID;
  item: DiscriminatedItem;
  type: ItemVisibilityOptionsType;
  createdAt: string;
  creator: Member;
};
