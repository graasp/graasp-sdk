import { DiscriminatedItem, Member } from '../index.js';
import { UUID } from '@/types.js';

export interface ItemPublished {
  id: UUID;
  creator?: Member;
  createdAt: string;
  item: DiscriminatedItem;
  totalViews: number;
}
