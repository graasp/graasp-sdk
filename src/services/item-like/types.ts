import { DiscriminatedItem } from '../index';
import { UUID } from '@/types';

export type ItemLike = {
  id: UUID;
  item: DiscriminatedItem;
  createdAt: string;
};
