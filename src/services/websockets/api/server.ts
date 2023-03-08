/**
 * Server message types for the graasp websockets network API
 * {@link https://github.com/graasp/graasp-plugin-websockets/blob/main/API.md}
 */
import { WebsocketError } from '../errors';
import { ClientMessage, NotifMessage } from './message';

/**
 * Server message types: describe what the server can send to the clients
 */
export enum ServerMessageTypes {
  /** Response to a previous client request */
  Response = 'response',
  /** Update with new data on a given channel */
  Update = 'update',
  /** Global broadcasts unrelated to any specific channel */
  Info = 'info',
}

export type ServerMessageType = ServerMessageTypes | `${ServerMessageTypes}`;

/**
 * Server response status
 */
export enum ResponseStatuses {
  Success = 'success',
  Error = 'error',
}

export type ResponseStatus =
  | ResponseStatuses
  | `${ResponseStatuses}`;

/**
 * Message sent by server as a response to a {@link ClientMessage} on success
 */
export interface SuccessServerResponse extends NotifMessage {
  type: `${ServerMessageTypes.Response}`;
  status: `${ResponseStatuses.Success}`;
  request: ClientMessage;
}

/**
 * Error message sent by server as a response to a {@link ClientMessage}
 */
export interface ErrorServerResponse extends NotifMessage {
  type: `${ServerMessageTypes.Response}`;
  status: `${ResponseStatuses.Error}`;
  request?: ClientMessage;
  error: WebsocketError;
}

export type ServerResponse = ErrorServerResponse | SuccessServerResponse;

/**
 * Message sent by server for misc broadcasts unrelated to a channel
 */
export interface ServerInfo<T = unknown> extends NotifMessage {
  type: `${ServerMessageTypes.Info}`;
  message: string;
  extra?: T;
}

/**
 * Message sent by server for update notifications sent over a channel
 */
export interface ServerUpdate<T = unknown> extends NotifMessage {
  type: `${ServerMessageTypes.Update}`;
  topic: string;
  channel: string;
  body: T;
}

/**
 * Server message type is union type of all server message subtypes
 */
export type ServerMessage = ServerResponse | ServerInfo | ServerUpdate;
