export const FeedBackOP = {
  UPDATE: 'update',
  DELETE: 'delete',
  MOVE: 'move',
  COPY: 'copy',
  EXPORT: 'export',
  RECYCLE: 'recycle',
  RESTORE: 'restore',
  VALIDATE: 'validate',
} as const;
export type FeedBackOPType = `${(typeof FeedBackOP)[keyof typeof FeedBackOP]}`;
export type ItemOpFeedbackResult<T> = {
  [FeedBackOP.UPDATE]: { [itemId: string]: T };
  [FeedBackOP.DELETE]: { [itemId: string]: T };
  [FeedBackOP.MOVE]: { items: T[]; moved: T[] };
  [FeedBackOP.COPY]: {
    items: T[];
    copies: T[];
  };
  [FeedBackOP.EXPORT]: { [itemId: string]: T };
  [FeedBackOP.RECYCLE]: { [itemId: string]: T };
  [FeedBackOP.RESTORE]: { [itemId: string]: T };
  [FeedBackOP.VALIDATE]: { [itemId: string]: T };
};

/**
 * Events from asynchronous background operations on given items
 */
export interface ItemOpFeedbackEvent<
  T extends { id: string },
  OP extends FeedBackOPType = FeedBackOPType,
> {
  kind: 'feedback';
  op: OP;
  resource: T['id'][];
  result?: ItemOpFeedbackResult<T>[OP];
  errors: Error[];
}

export const isOperationEvent = <
  T extends { id: string },
  OP extends FeedBackOPType,
>(
  event: ItemOpFeedbackEvent<T>,
  type: OP,
): event is ItemOpFeedbackEvent<T, OP> => event.op === type;
