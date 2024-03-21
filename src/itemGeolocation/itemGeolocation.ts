import { PackedItem } from '@/item/packedItem.js';
import { UUID } from '@/types.js';

export type ItemGeolocation = {
  id: UUID;
  lat: number;
  lng: number;
  item: PackedItem;
  country: string | null;
  addressLabel: string | null;
  helperLabel: string | null;
  createdAt: string;
  updatedAt: string;
};
