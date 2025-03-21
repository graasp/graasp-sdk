import { PermissionLevelOptions } from '@/enums/permissionLevel/permissionLevel.js';
import { DiscriminatedItem } from '@/item/item.js';
import { Member } from '@/member/member.js';
import { UUID } from '@/types.js';

export type Invitation = {
  id: UUID;
  email: string;
  permission: PermissionLevelOptions;
  name?: string;
  creator?: Member | null;
  item: DiscriminatedItem;
  createdAt: string;
  updatedAt: string;
};
