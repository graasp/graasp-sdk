import { FastifyLoggerInstance, FastifyReply, FastifyRequest } from 'fastify';

import { Actor, Task } from '../../../interfaces';
import { DatabaseTransactionHandler } from '../../database';
import { Action } from './action';

// type of the handler function responsible for building the action objects
export type ActionHandler = (args: {
  request: FastifyRequest;
  reply: FastifyReply;
  log: FastifyLoggerInstance;
  handler: DatabaseTransactionHandler;
}) => Promise<Action[]>;

export interface ActionTaskManager {
  createCreateTask(
    member: Actor,
    payload: {
      request: FastifyRequest;
      reply: FastifyReply;
      handler: ActionHandler;
    },
  ): Task<Actor, Action>;

  createGetActionsTaskSequence(
    member: Actor,
    itemId: string,
    payload: {
      itemPath?: string;
      sampleSize?: number;
      view?: string;
    },
  ): Task<Actor, unknown>[];

  createGetBaseAnalyticsForItemTaskSequence(
    member: Actor,
    payload: { itemId: string; sampleSize: number; view?: string },
  ): Task<Actor, unknown>[];

  createDeleteTask(member: Actor, memberId: string): Task<Actor, Action[]>;
}
