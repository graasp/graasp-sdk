import { PermissionLevel } from '../../../constants';
import { DiscriminatedItem, Member, UUID } from '@/index';

export interface ItemMembership {
  id: UUID;
  member: Member;
  item: DiscriminatedItem;
  permission: PermissionLevel;
  creator?: Member | null;
  createdAt: Date;
  updatedAt: Date;
}
