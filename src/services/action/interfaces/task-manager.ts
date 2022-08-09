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
}) => Promise<Partial<Action>[]>;

export interface ActionTaskManager {
  createCreateTask(
    member: Actor,
    payload: {
      request: FastifyRequest;
      reply: FastifyReply;
      handler: ActionHandler;
    },
  ): Task<Actor, Action>;
}
