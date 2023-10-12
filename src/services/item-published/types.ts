import { ActionRecord } from '@/frontend';
import { Item, Member } from '../index';
import { UUID } from '@/types';

export interface ItemPublished {
  id: UUID;
  creator?: Member;
  createdAt: Date;
  item: Item;
  totalViews: number;
}
