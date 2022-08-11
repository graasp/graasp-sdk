import { Actor, Task } from '../../../interfaces';
import { Member } from '../../members';
import { MemberRole } from './member-role';

export interface AdminTaskManager {
  createGetMemberRolesTask(
    member: Member,
    args: { validateRoleId?: string },
  ): Task<Actor, MemberRole[]>;
}
