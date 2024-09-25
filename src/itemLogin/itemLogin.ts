import { DiscriminatedItem } from '@/item/item.js';
import { UUID } from '@/types.js';

export enum ItemLoginSchemaType {
  Username = 'username',
  UsernameAndPassword = 'username+password',
  // TODO: not fully implemented
  Anonymous = 'anonymous',
  AnonymousAndPassword = 'anonymous+password',
}

export enum ItemLoginSchemaStatus {
  Active = 'active', // Guests can register and log in
  Disabled = 'disabled', // Guests can't register or log in
  Freeze = 'freeze', // Guests can only register
}

export interface ItemLoginSchema {
  id: UUID;
  item: DiscriminatedItem;
  type: `${ItemLoginSchemaType}` | ItemLoginSchemaType;
  status: `${ItemLoginSchemaStatus}` | ItemLoginSchemaStatus;
  createdAt: string;
  updatedAt: string;
}
