import { Context } from '@/enums/context.js';
import { DiscriminatedItem } from '@/item/item.js';
import { ItemMembership } from '@/itemMembership/itemMembership.js';
import { Member } from '@/member/member.js';

export type Action = {
  id: string;
  item?: DiscriminatedItem | null;
  member?: Member | null;
  view: Context | 'Unknown';
  type: string;
  extra: { [key: string]: unknown };
  // TODO: cannot import geoip
  geolocation?: unknown;
  createdAt: string;
};

export type ActionData = {
  actions: Action[];
  descendants: DiscriminatedItem[];
  item: DiscriminatedItem;
  itemMemberships: ItemMembership[];
  members: Member[];
  metadata: {
    numActionsRetrieved: number;
    requestedSampleSize: number;
  };
};

export enum ExportActionsFormatting {
  JSON = 'json',
  CSV = 'csv',
}
