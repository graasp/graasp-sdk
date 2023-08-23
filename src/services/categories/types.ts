import { DiscriminatedItem, Member } from '../index';
import { UUID } from '@/types';

export enum CategoryType {
  Level = 'level',
  Discipline = 'discipline',
  Language = 'language',
  ResourceType = 'resource-type',
}

/**
 * `Category` represents a sort of "tag" for items.
 * For example you can create a "math" category which would then relate to the `CategoryType`of "discipline"
 * @field type is a foreign key to a `CategoryType` instance
 */
export type Category = {
  id: UUID;
  name: string;
  type: `${CategoryType}` | CategoryType;
};

export type ItemCategory = {
  id: UUID;
  item: DiscriminatedItem;
  category: Category;
  createdAt: Date;
  creator: Member;
};
