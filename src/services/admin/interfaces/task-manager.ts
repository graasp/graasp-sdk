import { Actor, Task } from '../../../interfaces';
import { Member } from '../../members';

export interface AdminTaskManager {
  createGetMemberRolesTask(
    member: Member,
    args: { validateRoleId?: string },
  ): Task<Actor, unknown>;
}
