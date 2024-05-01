export const FeedBackOperation = {
  UPDATE: 'update',
  DELETE: 'delete',
  MOVE: 'move',
  COPY: 'copy',
  EXPORT: 'export',
  RECYCLE: 'recycle',
  RESTORE: 'restore',
  VALIDATE: 'validate',
} as const;
export type FeedBackOperationType =
  `${(typeof FeedBackOperation)[keyof typeof FeedBackOperation]}`;
export type ItemOpFeedbackResult<T> = {
  [FeedBackOperation.UPDATE]: { [itemId: string]: T };
  [FeedBackOperation.DELETE]: { [itemId: string]: T };
  [FeedBackOperation.MOVE]: { items: T[]; moved: T[] };
  [FeedBackOperation.COPY]: {
    items: T[];
    copies: T[];
  };
  [FeedBackOperation.EXPORT]: { [itemId: string]: T };
  [FeedBackOperation.RECYCLE]: { [itemId: string]: T };
  [FeedBackOperation.RESTORE]: { [itemId: string]: T };
  [FeedBackOperation.VALIDATE]: { [itemId: string]: T };
};

/**
 * Events from asynchronous background operations on given items
 */
export interface ItemOpFeedbackEvent<
  T extends { id: string },
  OP extends FeedBackOperationType = FeedBackOperationType,
> {
  kind: 'feedback';
  op: OP;
  resource: T['id'][];
  result?: ItemOpFeedbackResult<T>[OP];
  errors: Error[];
}

export const isOperationEvent = <
  T extends { id: string },
  OP extends FeedBackOperationType,
>(
  event: ItemOpFeedbackEvent<T>,
  type: OP,
): event is ItemOpFeedbackEvent<T, OP> => event.op === type;
