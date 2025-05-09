import { UnionOfConst } from '@/typeUtils.js';
import { UUID } from '@/types.js';

export const TagCategory = {
  Level: 'level',
  Discipline: 'discipline',
  ResourceType: 'resource-type',
} as const;
export type TagCategoryType = UnionOfConst<typeof TagCategory>;
export type Tag = { id: UUID; name: string; category: TagCategoryType };
