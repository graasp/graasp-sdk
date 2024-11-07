import { DiscriminatedItem } from '@/item/item.js';
import { Member } from '@/member/member.js';
import { UUID } from '@/types.js';

/**
 * @deprecated use TagCategory
 */
export enum CategoryType {
  Level = 'level',
  Discipline = 'discipline',
  Language = 'language',
  ResourceType = 'resource-type',
}

/**
 * `Category` represents a sort of "tag" for items.
 * For example you can create a "math" category which would then relate to the `CategoryType` of "discipline"
 * @field type is a foreign key to a `CategoryType` instance
 * @deprecated use Tag
 */
export type Category = {
  id: UUID;
  name: string;
  type: `${CategoryType}` | CategoryType;
};

/**
 * @deprecated use Tag
 */
export type ItemCategory = {
  id: UUID;
  item: DiscriminatedItem;
  category: Category;
  createdAt: string;
  creator: Member;
};
