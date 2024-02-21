import * as API from './api/index.js';
import * as Errors from './errors.js';
import * as Requests from './interfaces/request.js';

export * from './interfaces/service.js';
export * from './ws-client.js';

/**
 * Re-export types and utility classes within the Websocket namespace
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
export namespace Websocket {
  /* Errors */
  export import Error = Errors.WebsocketError;
  export import ErrorNames = Errors.ErrorNames;
  export type ErrorName = Errors.ErrorName;
  export import AccessDeniedError = Errors.AccessDeniedError;
  export import BadRequestError = Errors.BadRequestError;
  export import NotFoundError = Errors.NotFoundError;
  export import ServerError = Errors.ServerError;
  /* Requests */
  export type SubscriptionRequest = Requests.SubscriptionRequest;
  /* API */
  export import Realms = API.Realms;
  export type Realm = API.Realm;
  export type Message = API.Message;
  export type NotifMessage = API.NotifMessage;
  export import ClientActions = API.ClientActions;
  export type ClientAction = API.ClientAction;
  export type ClientDisconnect = API.ClientDisconnect;
  export type ClientSubscribe = API.ClientSubscribe;
  export type ClientUnsubscribe = API.ClientUnsubscribe;
  export type ClientSubscribeOnly = API.ClientSubscribeOnly;
  export type ClientMessage = API.ClientMessage;
  export import ServerMessageTypes = API.ServerMessageTypes;
  export type ServerMessageType = API.ServerMessageType;
  export import ResponseStatuses = API.ResponseStatuses;
  export type ResponseStatus = API.ResponseStatus;
  export type SuccessServerResponse = API.SuccessServerResponse;
  export type ErrorServerResponse = API.ErrorServerResponse;
  export type ServerResponse = API.ServerResponse;
  export type ServerInfo = API.ServerInfo;
  export type ServerUpdate = API.ServerUpdate;
  export type ServerMessage = API.ServerMessage;
}
