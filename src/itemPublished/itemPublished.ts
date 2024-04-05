import { DiscriminatedItem, Member, PackedItem } from '../index.js';
import { UUID } from '@/types.js';

export interface ItemPublished {
  id: UUID;
  creator?: Member;
  createdAt: string;
  item: DiscriminatedItem;
  totalViews: number;
}

export interface PackedItemPublished {
  id: UUID;
  creator?: Member;
  createdAt: string;
  item: PackedItem;
  totalViews: number;
}
