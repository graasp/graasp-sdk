import { PermissionLevelOptions } from '@/enums/permissionLevel/permissionLevel.js';
import { DiscriminatedItem } from '@/item/item.js';
import { Account, AccountType, Member } from '@/member/member.js';
import { UUID } from '@/types.js';

type AugmentedAccount =
  | (Member & {
      type: AccountType.Individual;
    })
  | (Account & {
      type: AccountType.Guest;
    });

export interface ItemMembership {
  id: UUID;
  account: AugmentedAccount;
  item: DiscriminatedItem;
  permission: PermissionLevelOptions;
  creator?: Account | null;
  createdAt: string;
  updatedAt: string;
}
