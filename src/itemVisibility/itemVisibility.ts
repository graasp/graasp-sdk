import { UnionOfConst } from '@/typeUtils.js';
import { UUID } from '@/types.js';

export const ItemVisibilityType = {
  Public: 'public',
  Hidden: 'hidden',
} as const;
export type ItemVisibilityOptionsType = UnionOfConst<typeof ItemVisibilityType>;

export type ItemVisibility = {
  id: UUID;
  itemPath: string;
  type: ItemVisibilityOptionsType;
  createdAt: string;
};
