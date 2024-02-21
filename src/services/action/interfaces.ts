import { DiscriminatedItem, ItemMembership, Member } from '..';
import { Context } from '@/constants/context.js';

export interface Action {
  id: string;
  item?: DiscriminatedItem | null;
  member?: Member | null;
  view: Context | 'Unknown';
  type: string;
  extra: { [key: string]: unknown };
  // TODO: cannot import geoip
  geolocation?: unknown;
  createdAt: string;
}

export interface ActionData {
  actions: Action[];
  descendants: DiscriminatedItem[];
  item: DiscriminatedItem;
  itemMemberships: ItemMembership[];
  members: Member[];
  metadata: {
    numActionsRetrieved: number;
    requestedSampleSize: number;
  };
}
