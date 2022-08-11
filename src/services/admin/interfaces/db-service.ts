import { DatabaseTransactionConnection as TrxHandler } from 'slonik';

import { MemberRole } from './member-role';

/**
 * Database's first layer of abstraction for Admin DB services
 */
export interface AdminService {
  /**
   * Get the role of given user
   * @param memberId
   * @param dbHandler Database handler
   */
  getMemberRoles(
    memberId: string,
    dbHandler: TrxHandler,
  ): Promise<MemberRole[]>;

  isAdmin(memberId: string, dbHandler: TrxHandler): Promise<boolean>;
}
