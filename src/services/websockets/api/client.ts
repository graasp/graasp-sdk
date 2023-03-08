/**
 * Client message types for the graasp websockets network API
 * {@link https://github.com/graasp/graasp-plugin-websockets/blob/main/API.md}
 */

import { NotifMessage } from './message';

/**
 * Client actions: describe what the client requests from the server
 */
export enum ClientActions {
  /** Subscribe to a channel */
  Subscribe = 'subscribe',
  /** Unsubscribe from a channel */
  Unsubscribe = 'unsubscribe',
  /** Subscribe only to a channel and unsubscribe from all others */
  SubscribeOnly = 'subscribeOnly',
  /** Disconnect from the websocket system */
  Disconnect = 'disconnect',
}

export type ClientAction = ClientActions | `${ClientActions}`;

/**
 * Message sent by client to disconnect
 */
export interface ClientDisconnect extends NotifMessage {
  action: `${ClientActions.Disconnect}`;
}

/**
 * Message sent by client to subscribe to some channel
 */
export interface ClientSubscribe extends NotifMessage {
  action: `${ClientActions.Subscribe}`;
  topic: string;
  channel: string;
}

/**
 * Message sent by client to unsubscribe from some channel
 */
export interface ClientUnsubscribe extends NotifMessage {
  action: `${ClientActions.Unsubscribe}`;
  topic: string;
  channel: string;
}

/**
 * Message sent by client to subscribe to a single channel
 * (i.e. it also unsubscribes it from any other channel)
 */
export interface ClientSubscribeOnly extends NotifMessage {
  action: `${ClientActions.SubscribeOnly}`;
  topic: string;
  channel: string;
}

/**
 * Client message type is union type of all client message subtypes
 */
export type ClientMessage =
  | ClientDisconnect
  | ClientSubscribe
  | ClientUnsubscribe
  | ClientSubscribeOnly;
