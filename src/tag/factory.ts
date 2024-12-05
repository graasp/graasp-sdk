import { v4 } from 'uuid';

import { Tag, TagCategory } from './tag.js';
import { faker } from '@faker-js/faker';

export function TagFactory(
  args: { name?: string; category?: TagCategory } = {},
): Tag {
  return {
    id: v4(),
    name: args.name ?? faker.word.noun(),
    category: args.category ?? faker.helpers.enumValue(TagCategory),
  };
}
