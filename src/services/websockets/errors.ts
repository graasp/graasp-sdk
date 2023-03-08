/**
 * Top-level error class for websockets
 * (useful e.g. to check instanceof)
 */
export abstract class WebsocketError extends Error {}

/**
 * Available websocket error names
 *
 * @example
 *  ```
 *    if (err.name === Websocket.ErrorNames.AccessDenied) {
 *      // handle access denied
 *    }
 *  ```
 */
export enum ErrorNames {
  AccessDenied = 'ACCESS_DENIED',
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  ServerError = 'SERVER_ERROR',
}

export type ErrorName = ErrorNames | `${ErrorNames}`;

export class AccessDeniedError extends WebsocketError {
  name: `${ErrorNames.AccessDenied}` = ErrorNames.AccessDenied;
  message = 'Websocket: Access denied for the requested resource';
}

export class BadRequestError extends WebsocketError {
  name: `${ErrorNames.BadRequest}` = ErrorNames.BadRequest;
  message =
    'Websocket: Request message format was not understood by the server';
}

export class NotFoundError extends WebsocketError {
  name: `${ErrorNames.NotFound}` = ErrorNames.NotFound;
  message = 'Websocket: Requested resource not found';
}

export class ServerError extends WebsocketError {
  name: `${ErrorNames.ServerError}` = ErrorNames.ServerError;
  constructor(message: string) {
    super((message = `Websocket: Internal server error: ${message}`));
  }
}
