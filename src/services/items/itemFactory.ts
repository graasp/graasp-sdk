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
    case ItemType.LOCAL_FILE:
    case ItemType.S3_FILE:
      return {
        [type]: {
          name: faker.system.fileName(),
          mimetype: faker.system.mimeType(),
          path: faker.system.filePath(),
          size: faker.number.int(),
          ...extra,
        },
      };
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
  const type = i.type ?? ItemType.FOLDER;
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
