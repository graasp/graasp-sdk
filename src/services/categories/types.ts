import { Item, Member } from '../index';
import { UUID } from '@/types';

// TODO: necessary ?? simplify ?? but we have endpoints

// TODO: translate? use keys? <<<- have a table ??? change for admin
export enum CategoryType {
  LEVEL = 'level',
  DISCIPLINE = 'discipline',
  LANGUAGE = 'language',
}

/**
 * `Category` represents a sort of "tag" for items.
 * For example you can create a "Math" category which would then relate to the `CategoryType`of "discipline"
 * @field type is a foreign key to a `CategoryType` instance
 */
export type Category = {
  id: UUID;
  name: string;
  type: CategoryType;
};

export type ItemCategory = {
  id: UUID;
  item: Item;
  category: Category;
  createdAt: Date;
  creator: Member;
};
