import { PermissionLevel } from '@/index';
import { UUID } from '@/types';

export type Invitation = {
  id: UUID;
  email: string;
  permission?: PermissionLevel;
  name?: string;
  creator: UUID;
  itemPath: string;
};
