import * as Errors from './errors';
import * as Requests from './interfaces/request';

export * from './interfaces/service';

/**
 * Re-export types and utility classes within the Websocket namespace
 */
export namespace Websocket {
  export type SubscriptionRequest = Requests.SubscriptionRequest;
  export import Error = Errors.WebsocketError;
  export import AccessDeniedError = Errors.AccessDeniedError;
  export import BadRequestError = Errors.BadRequestError;
  export import NotFoundError = Errors.NotFoundError;
  export import ServerError = Errors.ServerError;
}
