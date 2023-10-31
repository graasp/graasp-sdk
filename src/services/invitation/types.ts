import { DiscriminatedItem, Member, PermissionLevel } from '@/index';
import { UUID } from '@/types';

export type Invitation = {
  id: UUID;
  email: string;
  permission: PermissionLevel;
  name?: string;
  creator?: Member | null;
  item: DiscriminatedItem;
  createdAt: string;
  updatedAt: string;
};
