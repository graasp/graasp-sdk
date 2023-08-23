import { DiscriminatedItem, Member } from '../index';
import { UUID } from '@/types';

export type ItemLike = {
  id: UUID;
  item: DiscriminatedItem;
  creator: Member;
  createdAt: Date;
};
