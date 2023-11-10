import {
  ANALYTICS_ITEMS_PREFIX,
  BUILDER_ITEMS_PREFIX,
  LIBRARY_ITEMS_PREFIX,
  PLAYER_ITEMS_PREFIX,
  PROD_ANALYTICS_HOST,
  PROD_BUILDER_HOST,
  PROD_LIBRARY_HOST,
  PROD_PLAYER_HOST,
} from './constants';
import { Context } from './constants/context';
import { ClientHostManager } from './interfaces/shortLink';

export * from './utils';
export * from './constants';
export * from './interfaces';
export * from './services';
export * from './config';
export * from './types';

// Instanciate and add prefix and default host for the diffrent contexts.
ClientHostManager.getInstance()
  .addPrefix(Context.Builder, BUILDER_ITEMS_PREFIX)
  .addPrefix(Context.Library, LIBRARY_ITEMS_PREFIX)
  .addPrefix(Context.Player, PLAYER_ITEMS_PREFIX)
  .addPrefix(Context.Analytics, ANALYTICS_ITEMS_PREFIX)
  .addHost(Context.Builder, new URL(PROD_BUILDER_HOST))
  .addHost(Context.Library, new URL(PROD_LIBRARY_HOST))
  .addHost(Context.Player, new URL(PROD_PLAYER_HOST))
  .addHost(Context.Analytics, new URL(PROD_ANALYTICS_HOST));
