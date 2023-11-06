/**
 * Graasp websocket client
 * Provides front-end integration for real-time updates using WebSocket
 * Implements the client protocol from https://github.com/graasp/graasp-websockets
 */
import {
  ClientActions,
  ClientMessage,
  Realms,
  ResponseStatuses,
  ServerMessage,
  ServerMessageTypes,
} from '@/services/websockets/api';

export type Channel = {
  topic: string;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UpdateHandlerFn = (data: any) => void;

/**
 * Helper to remove the first element in an array that
 * matches the provided value IN PLACE
 */
function arrayRemoveFirstEqual<T>(
  array: Array<T>,
  value: T,
  eqFn = (a: T, b: T) => a === b,
) {
  const pos = array.findIndex((v) => eqFn(v, value));
  if (pos === -1) {
    return false;
  }
  const removed = array.splice(pos, 1);
  return removed.length > 0;
}

/**
 * Helper to add a value to a mapped array, creating the array
 * if the map entry does not exist
 */
function addToMappedArray<S, T>(map: Map<S, Array<T>>, key: S, value: T) {
  const array = map.get(key);
  if (array === undefined) {
    map.set(key, [value]);
  } else {
    array.push(value);
  }
}

/**
 * Helper to convert a channel object into a unique string
 * (deep equality) to serve as map keys
 */
function buildChannelKey(channel: Channel): string {
  // ensure serialized key is always identical (properties + order)
  const rebuiltChannel: Channel = {
    topic: channel.topic,
    name: channel.name,
  };
  return JSON.stringify(rebuiltChannel);
}
function keyToChannel(key: string): Channel {
  return JSON.parse(key);
}

/**
 * Websocket client for the graasp-websockets protocol
 */
export interface WebsocketClient {
  /**
   * Subscribe a handler to a given channel
   * @param channel Channel to which to subscribe to
   * @param handler Handler function to register
   */
  subscribe<T>(channel: Channel, handler: (data: T) => void): void;

  /**
   * Unsubscribe a handler from a channel, THE HANDLER MUST === THE ONE PASSED TO SUBSCRIBE
   * @param channel Channel from wihch to unsubscribe the provided handler from
   * @param handler Handler function to unregster, MUST BE EQUAL (===) TO PREVIOUSLY REGISTERED HANDLE WITH @see subscribe !
   */
  unsubscribe<T>(channel: Channel, handler: (data: T) => void): void;
}

// (de-)serializer instance
const serdes = {
  serialize: (msg: ClientMessage): string => JSON.stringify(msg),
  parse: (data: string): ServerMessage => JSON.parse(data),
};

export const configureWebsocketClient = (wsHost: string): WebsocketClient => {
  // native client WebSocket instance
  let ws: WebSocket;

  // TODO: heartbeat
  // the following code leads to flooding the backend when the user is not signed in
  // it is also because the backend does not allow public connection
  const assignWsClient = () => {
    console.debug('restarting ws client');
    ws = new WebSocket(wsHost);
    let keepAlive: ReturnType<typeof setInterval>;

    //   // on close, recreate connection
    // ws.addEventListener('close', () => {
    //   clearInterval(keepAlive);
    //   assignWsClient();
    // });
    // // keep alive on error, trigger close event
    // ws.addEventListener('error', (error) => {
    //   console.error(error);
    //   ws.close();
    // });
    // // ad-hoc ping mechanism
    // ws.addEventListener('open', () => {
    //   let ttl = 2;
    //   keepAlive = setInterval(() => {
    //     if (ttl <= 0) {
    //       ws.close();
    //       return;
    //     }
    //     // note: we abuse that sending a "ping" string will result in a bad request response
    //     ws.send('ping');
    //     ttl = ttl - 1;
    //   }, 30000);
    //   ws.addEventListener('message', () => {
    //     ttl = 2;
    //   });
    // });

    return ws;
  };

  ws = assignWsClient();

  const send = (request: ClientMessage) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(serdes.serialize(request));
    }
  };

  const sendSubscribeRequest = (channel: Channel) => {
    send({
      realm: Realms.Notif,
      action: ClientActions.Subscribe,
      topic: channel.topic,
      channel: channel.name,
    });
  };

  const sendUnsubscribeRequest = (channel: Channel) => {
    send({
      realm: Realms.Notif,
      action: ClientActions.Unsubscribe,
      topic: channel.topic,
      channel: channel.name,
    });
  };

  const subscriptions = {
    early: new Map<string, Array<UpdateHandlerFn>>(),
    waitingAck: new Map<string, Array<UpdateHandlerFn>>(),
    current: new Map<string, Array<UpdateHandlerFn>>(),
    info: new Array<UpdateHandlerFn>(),

    add: (channel: Channel, handler: UpdateHandlerFn): boolean => {
      const channelKey = buildChannelKey(channel);
      const maybeCurrent = subscriptions.current.get(channelKey);
      if (maybeCurrent !== undefined && maybeCurrent.length > 0) {
        // if already subscribed, don't subscribe again, simply register handler in current
        addToMappedArray(subscriptions.current, channelKey, handler);
        return false;
      }
      // if WS not ready, add to early, otherwise add to waiting ack
      const map =
        ws.readyState === ws.OPEN
          ? subscriptions.waitingAck
          : subscriptions.early;
      // create queue if doesn't exist for this channel, otherwise push to it
      addToMappedArray(map, channelKey, handler);
      return true;
    },

    remove: (channel: Channel, handler: UpdateHandlerFn): boolean => {
      // helper to remove from a subscription map
      // eslint-disable-next-line no-underscore-dangle
      const _remove = (
        map: Map<string, Array<UpdateHandlerFn>>,
        channelKey: string,
        removeHandler: UpdateHandlerFn,
      ): boolean => {
        const queue = map.get(channelKey);
        if (queue !== undefined) {
          return arrayRemoveFirstEqual(queue, removeHandler);
        }
        return false;
      };
      // helper to cleanup mapped array if it is empty
      // eslint-disable-next-line no-underscore-dangle
      const _cleanup = (
        map: Map<string, Array<UpdateHandlerFn>>,
        channelKey: string,
      ): boolean => {
        const isNowEmpty = map.get(channelKey)?.length === 0;
        if (isNowEmpty) {
          // cleanup array
          map.delete(channelKey);
        }
        return isNowEmpty;
      };

      const channelKey = buildChannelKey(channel);
      // find first map from which to remove from
      if (_remove(subscriptions.early, channelKey, handler)) {
        // no need to send unsubscribe if still in early
        return false;
      }
      if (_remove(subscriptions.waitingAck, channelKey, handler)) {
        // if in waitingAck must send unsubscribe if just got emptied
        return _cleanup(subscriptions.waitingAck, channelKey);
      }
      if (_remove(subscriptions.current, channelKey, handler)) {
        // if in current must send unsubscribe if just got emptied
        return _cleanup(subscriptions.current, channelKey);
      }
      return false;
    },

    ack: (channel: Channel) => {
      const channelKey = buildChannelKey(channel);
      // move all pending handlers from waitingAck to current
      const handlers = subscriptions.waitingAck.get(channelKey);
      handlers?.forEach((handler) => {
        addToMappedArray(subscriptions.current, channelKey, handler);
      });
      subscriptions.waitingAck.delete(channelKey);
    },
  };

  ws.addEventListener('open', () => {
    console.debug('Websocket connection opened');

    // send early subscriptions
    subscriptions.early.forEach((queue, channelKey) => {
      const channel = keyToChannel(channelKey);
      // move all handlers and send only one subscribtion per channel
      queue.forEach((handler) => {
        // move handler to waitingAck (guaranteed now since ws.readyState === OPEN)
        subscriptions.add(channel, handler);
      });
      sendSubscribeRequest(channel);
    });
    subscriptions.early.clear();
  });

  ws.addEventListener('message', (event) => {
    const update = serdes.parse(event.data);

    switch (update.type) {
      case ServerMessageTypes.Info: {
        subscriptions.info.forEach((fn) =>
          fn({ message: update.message, extra: update.extra }),
        );
        break;
      }

      case ServerMessageTypes.Response: {
        if (update.status === ResponseStatuses.Success) {
          const req = update.request;
          if (req?.action === ClientActions.Subscribe) {
            // when ack, move all from waiting acks to current
            subscriptions.ack({ name: req?.channel, topic: req?.topic });
          }
        } else {
          console.debug(
            `WS error response: ${update.error?.name} ${update.error?.message}`,
          );
        }
        break;
      }

      case ServerMessageTypes.Update: {
        // send update to all handlers of this channel
        const channel = { name: update.channel, topic: update.topic };
        const channelKey = buildChannelKey(channel);
        const handlers = subscriptions.current.get(channelKey);
        handlers?.forEach((fn) => fn(update.body));
        break;
      }

      default:
        console.debug('Unknown WS message');
    }
  });

  return {
    subscribe: <T>(channel: Channel, handler: (data: T) => void) => {
      if (subscriptions.add(channel, handler)) {
        sendSubscribeRequest(channel);
      }
    },
    unsubscribe: <T>(channel: Channel, handler: (data: T) => void) => {
      if (subscriptions.remove(channel, handler)) {
        sendUnsubscribeRequest(channel);
      }
    },
  };
};
