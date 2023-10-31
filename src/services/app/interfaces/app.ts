import { Publisher } from '..';
import { UUID } from '@/types';

export type AppExtra = {
  image?: string;
};

export interface App {
  id: UUID;
  key: string;
  name: string;
  description: string;
  url: string;
  extra: AppExtra;
  publisher: Publisher;
  createdAt: string;
  updatedAt: string;
}
