import { DiscriminatedItem } from '@/item/item.js';
import { PackedItem } from '@/item/packedItem.js';
import { UUID } from '@/types.js';

export type ItemLike = {
  id: UUID;
  item: DiscriminatedItem;
  createdAt: string;
};

export type PackedItemLike = {
  id: UUID;
  item: PackedItem;
  createdAt: string;
};
