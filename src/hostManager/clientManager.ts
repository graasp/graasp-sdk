import { Context } from '@/enums/context.js';

export class ClientManager {
  private static INSTANCE: ClientManager | null;
  private host: URL;
  private readonly clientHosts = new Map<Context, URL>();
  private readonly itemPrefixes = new Map<Context, string>([
    [Context.Builder, 'items/'],
    [Context.Player, ''],
    [Context.Library, 'collections/'],
    [Context.Analytics, 'items/'],
  ]);

  private constructor() {
    try {
      this.host = new URL(window.location.href);
    } catch {
      this.host = new URL('http://mock.graasp.org/');
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
   * @param host should have trailing slash
   * @returns instance
   */
  public setHost(host: URL) {
    this.host = host;
    return this;
  }

  public addHost(context: Context, host: URL) {
    if (this.clientHosts.has(context)) {
      throw new Error(
        `The given context '${context}' is already present in the hosts.`,
      );
    }

    this.clientHosts.set(context, host);
    return this;
  }

  public addItemPrefix(context: Context, prefix: string) {
    if (this.itemPrefixes.has(context)) {
      throw new Error(
        `The given context '${context}' is already present in the prefix map.`,
      );
    }

    this.itemPrefixes.set(context, prefix);
    return this;
  }

  private getBase(context: Context): string {
    switch (context) {
      case Context.Builder:
        return this.host.origin + '/builder/';
      case Context.Player:
        return this.host.origin + '/player/';
      case Context.Analytics:
        return this.host.origin + '/analytics/';
      case Context.Account:
        return this.host.origin + '/account/';
      case Context.Auth:
        return this.host.origin + '/auth/';
      case Context.Library: {
        const libraryHost = this.clientHosts.get(context);
        if (libraryHost) {
          return libraryHost.toString();
        } else {
          throw new Error('Library host used before it was defined.');
        }
      }
      default:
        throw new Error('base for context is not defined');
    }
  }

  /**
   *
   * @param context
   * @param path should not start with slash
   * @returns
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

  public getLinkByContext(
    context: Context,
    path: string = '',
    qs: { [key: string]: string | number | boolean } = {},
  ) {
    return this.getURLByContext(context, path, qs).toString();
  }

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

  public getItemLink(
    context: Context,
    itemId: string,
    qs?: { [key: string]: string | number | boolean },
  ) {
    return this.getItemAsURL(context, itemId, qs).toString();
  }

  public getContextByLink(link: string) {
    try {
      const { pathname, origin } = new URL(link);

      switch (true) {
        case pathname.startsWith('/builder'):
          return Context.Builder;
        case pathname.startsWith('/player'):
          return Context.Player;
        case pathname.startsWith('/auth'):
          return Context.Auth;
        case pathname.startsWith('/account'):
          return Context.Account;
        case pathname.startsWith('/analytics'):
          return Context.Analytics;
        case origin === this.clientHosts.get(Context.Library)?.origin:
          return Context.Library;
        default:
          return Context.Unknown;
      }
    } catch (e) {
      console.error(e);
      return Context.Unknown;
    }
  }
}
