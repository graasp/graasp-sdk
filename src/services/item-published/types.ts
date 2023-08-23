import { DiscriminatedItem, Member } from '../index';
import { UUID } from '@/types';

export interface ItemPublished {
  id: UUID;
  creator?: Member;
  createdAt: Date;
  item: DiscriminatedItem;
  totalViews: number;
}
