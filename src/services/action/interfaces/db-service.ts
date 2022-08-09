import { DatabaseTransactionConnection as TrxHandler } from 'slonik';

import { Action } from './action';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type CreateActionInput = PartialBy<PartialBy<Action, 'id'>, 'createdAt'>;

/**
 * Database's first layer of abstraction for Actions
 */
export declare class ActionService {
  // the 'safe' way to dynamically generate the columns names:
  private static allColumns;

  /**
   * Create given action and return it.
   * @param action Action to create
   * @param transactionHandler Database transaction handler
   */
  create(
    action: CreateActionInput,
    transactionHandler: TrxHandler,
  ): Promise<Action>;

  /**
   * Delete actions matching the given `memberId`. Return actions, or `null`, if delete has no effect.
   * @param memberId ID of the member whose actions are deleted
   * @param transactionHandler Database transaction handler
   */
  deleteActionsByUser(
    memberId: string,
    transactionHandler: TrxHandler,
  ): Promise<readonly Action[]>;

  /**
   * Get random actions matching the given itemPath and below
   * @param itemPath path of the item whose actions are retrieved
   * @param filters.sampleSize number of actions to retrieve
   * @param filters.view get actions only for a given view
   * @param transactionHandler database transaction handler
   */
  getActionsByItem(
    itemPath: string,
    filters: { sampleSize?: number; view?: string },
    transactionHandler: TrxHandler,
  ): Promise<readonly Action[]>;
}
