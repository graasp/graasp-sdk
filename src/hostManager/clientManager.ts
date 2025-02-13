import { Context } from '@/enums/context.js';

/**
 * subpath per context
 * it should not have a trailing slash
 */
const CONTEXT_PATHS = new Map<Context, string>([
  [Context.Builder, '/builder'],
  [Context.Player, '/player'],
  [Context.Auth, '/auth'],
  [Context.Account, '/account'],
  [Context.Analytics, '/analytics'],
  [Context.Home, '/home'],
]);

export class ClientManager {
  private static INSTANCE: ClientManager | null;
  private host: string;
  private readonly clientHosts = new Map<Context, string>();

  /**
   * defined prefixes for items, that should have trailing slash
   * we need to define library's prefix from the client
   */
  private readonly itemPrefixes = new Map<Context, string>([
    [Context.Builder, 'items/'],
    [Context.Player, ''],
    [Context.Library, 'collections/'],
    [Context.Analytics, 'items/'],
  ]);

  private constructor() {
    try {
      this.host = window.location.href;
    } catch {
      this.host = 'https://mock.graasp.org/';
    }
  }

  public static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new ClientManager();
      ClientManager.getInstance();
    }
    return this.INSTANCE;
  }

  /**
   * Define default host
   * @param host URL string that should have a trailing slash
   * @returns instance
   */
  public setHost(host: string) {
    // check host is a valid url
    const url = new URL(host);
    if (!url) {
      throw new Error('host is not valid');
    }

    this.host = url.origin;
    return this;
  }

  /**
   * Add a specific host for given context. A context cannot have its host set twice.
   * @param {Context} context
   * @param {URL} host
   * @returns instance
   */
  public addHost(context: Context, host: string) {
    if (this.clientHosts.has(context)) {
      throw new Error(
        `The given context '${context}' is already present in the hosts.`,
      );
    }

    const hostUrl = new URL(host);
    this.clientHosts.set(context, hostUrl.origin);
    return this;
  }

  private getBase(context: Context): string {
    if (context === Context.Library) {
      const libraryHost = this.clientHosts.get(context);
      if (libraryHost) {
        return libraryHost.toString();
      } else {
        throw new Error('Library host used before it was defined.');
      }
    }

    return this.host + CONTEXT_PATHS.get(context) + '/';
  }

  /**
   * Get URL by context
   * @param {Context} context
   * @param {string} path subpath, that should not start with slash
   * @param qs query strings to be added to the url
   * @returns url
   */
  public getURLByContext(
    context: Context,
    path: string = '',
    qs: { [key: string]: string | number | boolean } = {},
  ) {
    const base = this.getBase(context);
    const url = new URL(path, base);

    for (const [k, v] of Object.entries(qs)) {
      url.searchParams.set(k, v.toString());
    }
    return url;
  }

  /**
   * Get link string by context
   * @param {Context} context
   * @param {string} path subpath, that should not start with slash
   * @param qs query strings to be added to the url
   * @returns url string
   */
  public getLinkByContext(
    context: Context,
    path: string = '',
    qs: { [key: string]: string | number | boolean } = {},
  ) {
    return this.getURLByContext(context, path, qs).toString();
  }

  /**
   * Get URL to access an item by context
   * @param {Context} context
   * @param {string} itemId id of the item to build the URL for
   * @param qs query strings to be added to the url
   * @returns url
   */
  public getItemAsURL(
    context: Context,
    itemId: string,
    qs: { [key: string]: string | number | boolean } = {},
  ) {
    const base = this.getBase(context);
    const itemPrefix = this.itemPrefixes.get(context) ?? '';
    const url =
      context === Context.Player
        ? new URL(`${itemPrefix}${itemId}/${itemId}`, base)
        : new URL(`${itemPrefix}${itemId}`, base);

    for (const [k, v] of Object.entries(qs)) {
      url.searchParams.set(k, v.toString());
    }
    return url;
  }

  /**
   * Get link string to access an item by context
   * @param {Context} context
   * @param {string} itemId id of the item to build the URL for
   * @param qs query strings to be added to the url
   * @returns url string
   */
  public getItemLink(
    context: Context,
    itemId: string,
    qs?: { [key: string]: string | number | boolean },
  ) {
    return this.getItemAsURL(context, itemId, qs).toString();
  }

  /**
   * Get context given the link string
   * @param {string} link url to get the context from
   * @returns context
   */
  public getContextByLink(link: string) {
    try {
      const { pathname, origin } = new URL(link);

      for (const c of Object.values(Context)) {
        const subpath = CONTEXT_PATHS.get(c);
        if (subpath && pathname.startsWith(subpath)) {
          return c;
        }
      }

      const libraryHost = this.clientHosts.get(Context.Library);
      if (libraryHost && origin === new URL(libraryHost)?.origin) {
        return Context.Library;
      }

      return Context.Unknown;
    } catch (e) {
      console.error(e);
      return Context.Unknown;
    }
  }
}
