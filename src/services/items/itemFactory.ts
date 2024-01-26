import { DiscriminatedItem } from '.';
import { AppItemExtra, AppItemExtraProperties, MemberFactory } from '..';
import { ItemType } from '@/constants';
import {
  DocumentItemExtra,
  DocumentItemExtraProperties,
  FolderItemExtra,
  FolderItemExtraProperties,
} from '@/interfaces';
import { buildPathFromIds } from '@/utils';
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
  options: { dateType: 'string' | 'date' } = { dateType: 'string' },
) => {
  const type = i.type ?? ItemType.FOLDER;
  const id = i.id ?? faker.string.uuid();
  const createdAt = faker.date.anytime();
  const updatedAt = faker.date.anytime();

  const path =
    (i.parentItem ? i.parentItem.path + '.' : '') + buildPathFromIds(id);

  return {
    id,
    name: faker.person.fullName(),
    description: faker.internet.email(),
    createdAt:
      options.dateType === 'string' ? createdAt.toISOString() : createdAt,
    updatedAt:
      options.dateType === 'string' ? updatedAt.toISOString() : updatedAt,
    extra: ItemExtraFactory(type),
    type,

    settings: faker.helpers.arrayElement([{}]),
    creator: MemberFactory(),
    path,
    ...i,
  } as DiscriminatedItem;
};
