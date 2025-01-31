import { Context } from '@/enums/context.js';

export class ClientManager {
  private static INSTANCE: ClientManager | null;
  private host: URL;
  private readonly clientHosts = new Map<Context, URL>();
  private readonly itemPrefixes = new Map<Context, string>([
    [Context.Builder, '/items'],
    [Context.Player, ''],
    [Context.Library, '/collections'],
    [Context.Analytics, '/items'],
  ]);

  private constructor() {
    try {
      this.host = new URL(window.location.href);
    } catch {
      this.host = new URL('http://mock.graasp.org');
    }
  }

  public static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new ClientManager();
      ClientManager.getInstance();
    }
    return this.INSTANCE;
  }

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

  private getBase(context: Context) {
    switch (context) {
      case Context.Builder:
        return this.host.origin + '/builder';
      case Context.Player:
        return this.host.origin + '/player';
      case Context.Analytics:
        return this.host.origin + '/analytics';
      case Context.Account:
        return this.host.origin + '/account';
      case Context.Auth:
        return this.host.origin + '/auth';
      case Context.Library: {
        const libraryHost = this.clientHosts.get(context);
        if (libraryHost) {
          return libraryHost;
        } else {
          throw new Error('Library host used before it was defined.');
        }
      }
    }
  }

  public getURLByContext(context: Context, path: string = '') {
    const base = this.getBase(context);
    return new URL(path, base);
  }

  public getLinkByContext(context: Context, path: string = '') {
    return this.getURLByContext(context, path).toString();
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
        ? new URL(`${itemPrefix}/${itemId}/${itemId}`, base)
        : new URL(`${itemPrefix}/${itemId}`, base);

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
    const { pathname, host } = new URL(link);
    if (pathname.startsWith('/builder')) {
      return Context.Builder;
    } else if (host === this.clientHosts.get(Context.Library)?.origin) {
      return Context.Library;
    }
    // TODO

    return Context.Unknown;
  }
}
