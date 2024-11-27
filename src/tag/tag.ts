import { UUID } from '@/types.js';

export enum TagCategory {
  Level = 'level',
  Discipline = 'discipline',
  ResourceType = 'resource-type',
}

export type Tag = { id: UUID; name: string; category: TagCategory };
