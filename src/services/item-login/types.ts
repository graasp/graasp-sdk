import { Item, Member } from '../index';
import { ItemLoginSchemaType, UUID } from '@/index';

export interface ItemLoginSchema {
  id: UUID;
  item: Item;
  type: `${ItemLoginSchemaType}` | ItemLoginSchemaType;
  createdAt: Date;
  updatedAt: Date;
}

export type ItemLogin = {
  id: UUID;
  member: Member;
  itemLoginSchema: ItemLoginSchema;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
};
