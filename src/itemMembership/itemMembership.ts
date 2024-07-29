import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
import { DiscriminatedItem } from '@/item/item.js';
import { Account } from '@/member/member.js';
import { UUID } from '@/types.js';

export interface ItemMembership {
  id: UUID;
  account: Account;
  item: DiscriminatedItem;
  permission: PermissionLevel;
  creator?: Account | null;
  createdAt: string;
  updatedAt: string;
}
