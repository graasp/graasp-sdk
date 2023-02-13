import { UUID } from '@/types';

/**
 * Higher order categories for `Categories`.
 * For example: "discipline", "education level", "language"
 *
 */
export type CategoryType = {
  id: UUID;
  name: string;
};

/**
 * `Category` represents a sort of "tag" for items.
 * For example you can create a "Math" category which would then relate to the `CategoryType`of "discipline"
 * @field type is a foreign key to a `CategoryType` instance
 */
export type Category = {
  id: UUID;
  name: string;
  type: UUID;
};

export type ItemCategory = {
  id: UUID;
  itemId: UUID;
  categoryId: UUID;
  createdAt: string;
  creator: string;
};
