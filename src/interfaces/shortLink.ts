import { AnyOfExcept } from '..';
import { Context } from '@/constants';

// This const is used to define the allowed Platforms.
// It is used in schema or database enums.
export const ShortLinkPlatform = {
  [Context.Builder]: Context.Builder,
  [Context.Player]: Context.Player,
  [Context.Library]: Context.Library,
} as const;

export type ShortLink = {
  alias: string;
  platform: keyof typeof ShortLinkPlatform;
  item: { id: string };
  createdAt: string;
};

export type ShortLinkPostPayload = Omit<ShortLink, 'createdAt'>;
export type ShortLinkPatchPayload = AnyOfExcept<
  ShortLink,
  'createdAt' | 'item'
>;
export type ShortLinkPutPayload = Omit<ShortLink, 'createdAt' | 'item'>;
export type ShortLinkAvailable = {
  available: boolean;
};

export class ClientHostManager {
  private static INSTANCE: ClientHostManager | null;
  private clientHosts = new Map<Context, URL>();
  private clientPrefix = new Map<Context, string>();

  private constructor() {}

  public static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new ClientHostManager();
    }
    return this.INSTANCE;
  }

  public getHost(context: Context) {
    const host = this.clientHosts.get(context);
    if (host !== undefined) {
      // create new URL to keep current host map immutable
      return new URL(host);
    }

    throw new Error(
      `The given context '${context}' is not present in the hosts.`,
    );
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

  public getPrefix(context: Context) {
    const prefix = this.clientPrefix.get(context);

    if (prefix !== undefined) {
      return prefix;
    }

    throw new Error(
      `The given context '${context}' is not present in the prefix.`,
    );
  }

  public addPrefix(context: Context, prefix: string) {
    if (this.clientPrefix.has(context)) {
      throw new Error(
        `The given context '${context}' is already present in the prefix.`,
      );
    }

    this.clientPrefix.set(context, prefix);
    return this;
  }

  public getHostAndPrefix(context: Context) {
    const host = this.getHost(context);
    const prefix = this.getPrefix(context);

    // create new URL to keep current host map immutable
    return { host: new URL(host), prefix };
  }

  public getItemAsURL(context: Context, itemId: string) {
    const host = this.getHost(context);
    const prefix = this.getPrefix(context);
    const url = new URL(`${prefix}/${itemId}`, host.origin);
    return url;
  }

  public getItemLink(context: Context, itemId: string) {
    return this.getItemAsURL(context, itemId).toString();
  }
}
