import { DiscriminatedItem } from '@/item/item.js';
import { UUID } from '@/types.js';

export enum ItemLoginSchemaType {
  Username = 'username',
  UsernameAndPassword = 'username+password',
  // TODO: not fully implemented
  Anonymous = 'anonymous',
  AnonymousAndPassword = 'anonymous+password',
}

export interface ItemLoginSchema {
  id: UUID;
  item: DiscriminatedItem;
  type: `${ItemLoginSchemaType}` | ItemLoginSchemaType;
  createdAt: string;
  updatedAt: string;
}
