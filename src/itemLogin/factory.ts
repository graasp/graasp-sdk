import {
  ItemLoginSchema,
  ItemLoginSchemaStatus,
  ItemLoginSchemaType,
} from './itemLogin.js';
import { faker } from '@faker-js/faker';

export function ItemLoginSchemaFactory(
  itemLoginSchema: Partial<ItemLoginSchema> & Pick<ItemLoginSchema, 'item'>,
): ItemLoginSchema {
  return {
    id: faker.string.uuid(),
    type: ItemLoginSchemaType.Username,
    status: ItemLoginSchemaStatus.Active,
    createdAt: faker.date.anytime().toISOString(),
    updatedAt: faker.date.anytime().toISOString(),
    ...itemLoginSchema,
  };
}
