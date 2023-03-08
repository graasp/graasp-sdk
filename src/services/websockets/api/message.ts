/**
 * Message types for the graasp websockets network API
 * {@link https://github.com/graasp/graasp-plugin-websockets/blob/main/API.md}
 */

/**
 * Message realms: describe the universe in which the message belongs to
 */
export enum Realms {
  /** Notifications realm for real-time updates in Graasp */
  Notif = 'notif',
}

export type Realm = Realms | `${Realms}`;

/**
 * Base message shape
 */
export interface Message {
  realm: Realm;
}

/**
 * Base message for real-time updates and notifications in Graasp
 */
export interface NotifMessage extends Message {
  realm: `${Realms.Notif}`;
}
