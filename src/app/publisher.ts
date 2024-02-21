import { UUID } from '@/types.js';

export type Publisher = {
  id: UUID;
  name: string;
  origins: string[];
  createdAt: string;
  updatedAt: string;
};
