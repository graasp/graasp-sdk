import { faker } from '@faker-js/faker';
import { ItemLoginSchema, ItemLoginSchemaType } from './itemLogin.js';

export function itemLoginSchemaFactory (
  itemLoginSchema: Partial<ItemLoginSchema>& Pick<ItemLoginSchema, 'item'>,
): ItemLoginSchema {
    return {
    id: faker.string.uuid(),
    type: ItemLoginSchemaType.Username,
    createdAt: faker.date.anytime().toISOString(),
    updatedAt: faker.date.anytime().toISOString(),
  ...itemLoginSchema,

  };
}
