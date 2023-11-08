import { Context } from '@/constants';

// This const is used to define the allowed Platforms.
// It is used in schema or database enums.
export const ShortLinkPlatform = {
  [Context.Builder]: Context.Builder,
  [Context.Player]: Context.Player,
  [Context.Library]: Context.Library,
};

export interface ShortLinkPayload {
  alias: string;
  platform: keyof typeof ShortLinkPlatform;
  item: { id: string };
}

export interface ShortLinkResponse extends ShortLinkPayload {
  createdAt: string;
}

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
    if (!this.clientHosts.has(context)) {
      throw new Error(
        `The given context '${context}' is not present in the hosts.`,
      );
    }
    return this.clientHosts.get(context);
  }

  public addHost(context: Context, host: URL, replace: boolean = false) {
    if (!replace && this.clientHosts.has(context)) {
      throw new Error(
        `The given context '${context}' is already present in the hosts.`,
      );
    }

    this.clientHosts.set(context, host);
    return this;
  }

  public getPrefix(context: Context) {
    if (!this.clientPrefix.has(context)) {
      throw new Error(
        `The given context '${context}' is not present in the prefix.`,
      );
    }
    return this.clientPrefix.get(context);
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

    return { host, prefix };
  }
}
