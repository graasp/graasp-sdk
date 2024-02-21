import { SubscriptionRequest } from './request.js';

/**
 * Public WebSocket service exposed to other consumers on the server
 * (e.g. other services that want to publish messages using websockets)
 */
export interface WebsocketService {
  /**
   * Registers a topic (a group of related channels) dedicated to the caller
   * @param topic           topic name, must be unique across server
   * @param validateClient  async function called when a client attempts to
   *                        subscribe to a channel from this topic
   */
  register(
    topic: string,
    validateClient: (request: SubscriptionRequest) => Promise<void>,
  ): this;

  /**
   * Publishes a message on a channel globally (incl. across server instances)
   * @param topic topic name
   * @param channel channel name
   * @param message message to publish
   */
  publish<Message>(topic: string, channel: string, message: Message): void;

  /**
   * Publishes a message on a channel locally (i.e. on this specific server
   * instance only)
   * @param topic topic name
   * @param channel channel name
   * @param message message to publish
   */
  publishLocal<Message>(topic: string, channel: string, message: Message): void;
}
