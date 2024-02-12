import { DiscriminatedItem } from '..';
import { UUID } from '@/types';

export type ItemGeolocation = {
  id: UUID;
  lat: number;
  lng: number;
  item: DiscriminatedItem;
  country: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
};
