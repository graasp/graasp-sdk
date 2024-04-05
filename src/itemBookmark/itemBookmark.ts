import { DiscriminatedItem } from '@/item/item.js';
import { PackedItem } from '@/item/packedItem.js';
import { UUID } from '@/types.js';

export type ItemBookmark = {
  id: UUID;
  item: DiscriminatedItem;
  createdAt: string;
};

export type PackedItemBookmark = {
  id: UUID;
  item: PackedItem;
  createdAt: string;
};

/**
 * @deprecated use ItemBookmark
 */
export type ItemFavorite = ItemBookmark;
