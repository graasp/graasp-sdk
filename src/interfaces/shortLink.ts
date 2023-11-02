import { Context } from '@/constants';

export interface ShortLinkPayload {
  alias: string;
  platform: Context.Player | Context.Builder | Context.Library;
  itemId: string;
}

export interface ShortLinkResponse extends ShortLinkPayload {
  host: string;
  prefix: string;
}
