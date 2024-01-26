import { DiscriminatedItem } from '.';
import { AppItemExtra, AppItemExtraProperties, MemberFactory } from '..';
import { ItemType } from '@/constants';
import {
  DocumentItemExtra,
  DocumentItemExtraProperties,
  FolderItemExtra,
  FolderItemExtraProperties,
} from '@/interfaces';
import { faker } from '@faker-js/faker';

// TODO: match type with extra type and return value
export const ItemExtraFactory = (
  type: DiscriminatedItem['type'] = ItemType.FOLDER,
  extra?:
    | Partial<FolderItemExtraProperties>
    | Partial<AppItemExtraProperties>
    | Partial<DocumentItemExtraProperties>,
) => {
  switch (type) {
    case ItemType.APP:
      return {
        [type]: {
          url: faker.internet.url(),
          settings: faker.helpers.arrayElement([{}, { some: 'settings' }]),
          ...extra,
        },
      } as AppItemExtra;
    case ItemType.DOCUMENT:
      return {
        [type]: {
          content: faker.lorem.text(),
          ...extra,
        },
      } as DocumentItemExtra;
    case ItemType.FOLDER:
    default:
      return {
        [ItemType.FOLDER]: {
          childrenOrder: [],
          ...extra,
        },
      } as FolderItemExtra;
  }
};

faker.helpers.arrayElement([
  { lang: faker.helpers.arrayElement(['en', 'fr', 'de']) },
  {},
]);

export const ItemFactory = (
  i: Partial<DiscriminatedItem> & { parentItem?: DiscriminatedItem } = {},
) => {
  const type = faker.helpers.arrayElement(Object.values(ItemType));
  const id = i.id ?? faker.string.uuid();
  return {
    id,
    name: faker.person.fullName(),
    description: faker.internet.email(),
    createdAt: faker.date.anytime().toISOString(),
    updatedAt: faker.date.anytime().toISOString(),
    extra: ItemExtraFactory(type),
    type,

    settings: faker.helpers.arrayElement([{}]),
    creator: MemberFactory(),
    path:
      (i.parentItem?.path ? `${i.parentItem?.path}.` : '') +
      id.replaceAll('-', '_'),
    ...i,
  } as DiscriminatedItem;
};
