import { FastifyReply, FastifyRequest } from 'fastify';

import { Actor, Task } from '../../../interfaces';
import { Action } from './action';
import { ActionBuilder } from './action-builder';

export interface ActionTaskManager {
  createCreateTask(
    member: Actor,
    payload: {
      request: FastifyRequest;
      reply: FastifyReply;
      actionBuilder: ActionBuilder;
    },
  ): Task<Actor, Action>;
}
