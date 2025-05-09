import { v4 } from 'uuid';

import { Tag, TagCategory, TagCategoryType } from './tag.js';
import { faker } from '@faker-js/faker';

export function TagFactory(
  args: { name?: string; category?: TagCategoryType } = {},
): Tag {
  return {
    id: v4(),
    name: args.name ?? faker.word.noun(),
    category: args.category ?? faker.helpers.enumValue(TagCategory),
  };
}
