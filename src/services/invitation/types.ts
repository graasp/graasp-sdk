import { PermissionLevel } from 'src/index';
import { UUID } from 'src/types';

export type Invitation = {
  id: UUID;
  email: string;
  permission?: PermissionLevel;
  name?: string;
  creator: UUID;
  itemPath: string;
};
