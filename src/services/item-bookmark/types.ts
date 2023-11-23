import { DiscriminatedItem } from '../index';
import { UUID } from '@/types';

export type ItemBookmark = {
  id: UUID;
  item: DiscriminatedItem;
  createdAt: string;
};

/**
 * @deprecated use ItemBookmark
 */
export type ItemFavorite = ItemBookmark;
