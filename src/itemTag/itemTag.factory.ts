import { ItemTag } from './itemTag.js';
import { FolderItemFactory } from '@/item/folderItem/folderItem.factory.js';
import { MemberFactory } from '@/member/factory.js';
import { faker } from '@faker-js/faker';

export const ItemTagFactory = (
  it: Partial<ItemTag> & Pick<ItemTag, 'type'>,
): ItemTag => ({
  id: it.id ?? faker.string.uuid(),
  createdAt: faker.date.anytime().toISOString(),
  item: it.item ?? FolderItemFactory(),
  type: it.type,
  creator: it.creator ?? MemberFactory(),
});
