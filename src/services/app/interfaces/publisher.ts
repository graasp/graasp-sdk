import { UUID } from '@/types';

export interface Publisher {
  id: UUID;
  name: string;
  origins: string[];
  createdAt: string;
  updatedAt: string;
}
