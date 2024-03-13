import { DiscriminatedItem } from '@/item/item.js';
import { UUID } from '@/types.js';

export type ItemGeolocation = {
  id: UUID;
  lat: number;
  lng: number;
  item: DiscriminatedItem;
  country: string | null;
  addressLabel: string | null;
  helperLabel: string | null;
  createdAt: string;
  updatedAt: string;
};
