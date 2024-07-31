import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
import { DiscriminatedItem } from '@/item/item.js';
import { AugmentedAccount } from '@/member/member.js';
import { UUID } from '@/types.js';

export interface ItemMembership {
  id: UUID;
  account: AugmentedAccount;
  item: DiscriminatedItem;
  permission: PermissionLevel;
  creator?: AugmentedAccount | null;
  createdAt: string;
  updatedAt: string;
}
