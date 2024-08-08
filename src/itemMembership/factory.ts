import { ItemMembership } from './itemMembership.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
import { FolderItemFactory } from '@/item/folderItem/folderItem.factory.js';
import { MemberFactory } from '@/member/factory.js';
import { faker } from '@faker-js/faker';

export const ItemMembershipFactory = (
  im: Partial<ItemMembership> & Pick<ItemMembership, 'item'> = {
    item: FolderItemFactory(),
  },
): ItemMembership => ({
  id: faker.string.uuid(),
  createdAt: faker.date.anytime().toISOString(),
  updatedAt: faker.date.anytime().toISOString(),
  account: im.account ?? MemberFactory(),
  permission: faker.helpers.enumValue(PermissionLevel),
  ...im,
});
