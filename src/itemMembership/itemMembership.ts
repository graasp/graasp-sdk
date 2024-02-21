import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
import { DiscriminatedItem } from '@/item/item.js';
import { Member } from '@/member/member.js';
import { UUID } from '@/types.js';

export interface ItemMembership {
  id: UUID;
  member: Member;
  item: DiscriminatedItem;
  permission: PermissionLevel;
  creator?: Member | null;
  createdAt: string;
  updatedAt: string;
}
