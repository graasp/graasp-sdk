import { DiscriminatedItem } from '../index';
import { UUID } from '@/types';

export type ItemFavorite = {
  id: UUID;
  item: DiscriminatedItem;
  createdAt: string;
};
