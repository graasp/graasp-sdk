import { UUID } from '@/types';

export type ItemTag = {
  id: UUID;
  itemPath: string;
  tagId: UUID;
  createdAt: string;
  creator: string;
};
