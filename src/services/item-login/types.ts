import { DiscriminatedItem, Member } from '../index';
import { ItemLoginSchemaType, UUID } from '@/index';

export interface ItemLoginSchema {
  id: UUID;
  item: DiscriminatedItem;
  type: `${ItemLoginSchemaType}` | ItemLoginSchemaType;
  createdAt: string;
  updatedAt: string;
}

export type ItemLogin = {
  id: UUID;
  member: Member;
  itemLoginSchema: ItemLoginSchema;
  password?: string;
  createdAt: string;
  updatedAt: string;
};
