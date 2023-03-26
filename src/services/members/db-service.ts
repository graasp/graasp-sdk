import { DatabaseTransactionConnection as TrxHandler } from 'slonik';

import { UnknownExtra } from '../../interfaces/extra';
import { Member } from './interfaces/member';

/**
 * Database's first layer of abstraction for Members
 */
export declare class MemberService {
  private static allColumns;
  /**
   * Get member(s) matching the properties of the given (partial) member.
   * Ignores `extra`, `created_at`, and `updated_at`.
   * @param member Partial member
   * @param dbHandler Database handler
   * @param properties List of Member properties to fetch - defaults to 'all'
   */
  getMatching(
    member: Omit<Partial<Member>, 'extra' | 'created_at' | 'updated_at'>,
    dbHandler: TrxHandler,
    properties?: (keyof Member)[],
  ): Promise<Member[]>;
  /**
   * Get member matching the given `id` or `null`, if not found.
   * @param id Member's id
   * @param dbHandler Database handler
   * @param properties List of Member properties to fetch - defaults to 'all'
   */
  get<E extends UnknownExtra>(
    id: string,
    dbHandler: TrxHandler,
    properties?: (keyof Member)[],
  ): Promise<Member<E>>;
  /**
   * Create member and return it.
   * @param member Member to create
   * @param transactionHandler Database transaction handler
   */
  create<E extends UnknownExtra>(
    member: Partial<Member<E>>,
    transactionHandler: TrxHandler,
  ): Promise<Member<E>>;
  /**
   * Update member with given changes and return it.
   * @param id Member id
   * @param data Member changes
   * @param transactionHandler Database transaction handler
   */
  update<E extends UnknownExtra>(
    id: string,
    data: Partial<Member<E>>,
    transactionHandler: TrxHandler,
  ): Promise<Member<E>>;

  /**
   * Delete member
   * @param id Member id
   * @param transactionHandler Database transaction handler
   */
  delete<E extends UnknownExtra>(
    id: string,
    transactionHandler: TrxHandler,
  ): Promise<Member<E>>;

  /**
   * Return the number of sign up today
   * @param transactionHandler Database transaction handler
   */
  getNumberOfNewAccountsToday(
    transactionHandler: TrxHandler,
  ): Promise<number>;
}
