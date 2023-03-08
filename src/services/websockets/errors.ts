/**
 * Top-level error class for websockets
 * (useful e.g. to check instanceof)
 */
export abstract class WebsocketError extends Error {}

export class AccessDeniedError extends WebsocketError {
  name = 'ACCESS_DENIED';
  message = 'Websocket: Access denied for the requested resource';
}

export class BadRequestError extends WebsocketError {
  name = 'BAD_REQUEST';
  message =
    'Websocket: Request message format was not understood by the server';
}

export class NotFoundError extends WebsocketError {
  name = 'NOT_FOUND';
  message = 'Websocket: Requested resource not found';
}

export class ServerError extends WebsocketError {
  name = 'SERVER_ERROR';
  constructor(message: string) {
    super((message = `Websocket: Internal server error: ${message}`));
  }
}
