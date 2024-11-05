import { ItemVisibility } from './itemVisibility.js';
import { FolderItemFactory } from '@/item/folderItem/folderItem.factory.js';
import { MemberFactory } from '@/member/factory.js';
import { faker } from '@faker-js/faker';

export const ItemVisibilityFactory = (
  it: Partial<ItemVisibility> & Pick<ItemVisibility, 'type'>,
): ItemVisibility => ({
  id: it.id ?? faker.string.uuid(),
  createdAt: faker.date.anytime().toISOString(),
  item: it.item ?? FolderItemFactory(),
  type: it.type,
  creator: it.creator ?? MemberFactory(),
});
