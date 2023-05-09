import { Item, ItemMembership, Member } from '..';
import { Context } from '@/constants';
import { Anything } from '@/interfaces';

export interface Action {
  id: string;
  item?: Item | null;
  member?: Member | null;
  view: Context | 'Unknown';
  type: string;
  extra: Anything;
  // TODO: cannot import geoip
  geolocation?: unknown;
  createdAt: Date;
}

export interface ActionData {
  actions: Action[];
  descendants: Item[];
  item: Item;
  itemMemberships: ItemMembership[];
  members: Member[];
  metadata: {
    numActionsRetrieved: number;
    requestedSampleSize: number;
  };
}
