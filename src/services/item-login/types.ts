import { Item } from '../index';
import { ItemLoginSchemaType } from '@/index';

export interface ItemLoginSchema {
  id: string;
  item: Item;
  type: ItemLoginSchemaType;
  createdAt: Date;
  updatedAt: Date;
}
