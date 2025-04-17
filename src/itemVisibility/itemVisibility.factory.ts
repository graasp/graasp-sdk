import { v4 } from 'uuid';

import { ItemVisibility } from './itemVisibility.js';
import { buildPathFromIds } from '@/item/itemUtils.js';
import { faker } from '@faker-js/faker';

export const ItemVisibilityFactory = (
  it: Partial<ItemVisibility> & Pick<ItemVisibility, 'type'>,
): ItemVisibility => ({
  id: it.id ?? faker.string.uuid(),
  createdAt: faker.date.anytime().toISOString(),
  itemPath: it.itemPath ?? buildPathFromIds(v4()),
  type: it.type,
  // creator: it.creator ?? MemberFactory(),
});
