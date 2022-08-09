import { FastifyLoggerInstance, FastifyReply, FastifyRequest } from 'fastify';

import { DatabaseTransactionHandler } from '../../database';
import { Action } from './action';

// type of the builder function responsible for generating part of the action objects
// it is used in createActionTask, and provide actions data to be saved given the request
// each plugin will define it's own action builder
export type ActionBuilder = (args: {
  request: FastifyRequest;
  reply: FastifyReply;
  log: FastifyLoggerInstance;
  handler: DatabaseTransactionHandler;
}) => Promise<(Partial<Action> & { actionType: string })[]>;
