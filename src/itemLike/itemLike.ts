import { DiscriminatedItem } from '@/item/item.js';
import { UUID } from '@/types.js';

export type ItemLike = {
  id: UUID;
  item: DiscriminatedItem;
  createdAt: string;
};
