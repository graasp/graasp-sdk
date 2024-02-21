import { DiscriminatedItem } from '@/item/item.js';
import { UUID } from '@/types.js';

export type ItemBookmark = {
  id: UUID;
  item: DiscriminatedItem;
  createdAt: string;
};

/**
 * @deprecated use ItemBookmark
 */
export type ItemFavorite = ItemBookmark;
