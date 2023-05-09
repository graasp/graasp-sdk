import { UUID } from '@/types';
import { Publisher } from '..';

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
  createdAt: Date;
  updatedAt: Date;
}
