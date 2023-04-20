import { PermissionLevel } from '../../../constants';
import { Item, Member, UUID } from '@/index';

export interface ItemMembership {
  id: UUID;
  member: Member;
  item: Item;
  permission: PermissionLevel;
  creator?: Member;
  createdAt: Date;
  updatedAt: Date;
}
