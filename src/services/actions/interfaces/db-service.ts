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
}
