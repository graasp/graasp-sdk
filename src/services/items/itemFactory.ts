import { DiscriminatedItem, Item } from '.';
import { MemberFactory } from '..';
import { CCLicenseAdaptions, ItemType } from '@/constants';
import { buildPathFromIds } from '@/utils';
import { faker } from '@faker-js/faker';

export const buildExtraAndType = ({
  type = ItemType.FOLDER,
  extra,
}: Partial<Pick<DiscriminatedItem, 'type' | 'extra'>>): Pick<
  DiscriminatedItem,
  'type' | 'extra'
> => {
  switch (type) {
    case ItemType.APP:
      return {
        type,
        extra: extra ?? {
          [type]: {
            url: faker.internet.url(),
            settings: {},
          },
        },
      };
    case ItemType.DOCUMENT:
      return {
        type,
        extra: extra ?? {
          [type]: {
            content: faker.lorem.text(),
          },
        },
      };
    case ItemType.LINK:
      return {
        type,
        extra: extra ?? {
          [ItemType.LINK]: {
            html: 'html',
            icons: [],
            thumbnails: [],
            url: faker.internet.url(),
          },
        },
      };
    case ItemType.H5P:
      return {
        type,
        extra: extra ?? {
          [ItemType.H5P]: {
            contentId: faker.string.uuid(),
            h5pFilePath: faker.system.filePath(),
            contentFilePath: faker.system.filePath(),
          },
        },
      };
    case ItemType.ETHERPAD:
      return {
        type,
        extra: extra ?? {
          [ItemType.ETHERPAD]: {
            padID: faker.string.uuid(),
            groupID: faker.string.uuid(),
          },
        },
      };
    case ItemType.SHORTCUT:
      return {
        type,
        extra: extra ?? {
          [ItemType.SHORTCUT]: {
            target: faker.string.uuid(),
          },
        },
      };
    // bug: duplicate because of type
    case ItemType.LOCAL_FILE:
      return {
        type,
        extra: extra ?? {
          [type]: {
            name: faker.system.fileName(),
            mimetype: faker.system.mimeType(),
            path: faker.system.filePath(),
            size: faker.number.int(),
            altText: faker.lorem.word(),
            content: faker.lorem.text(),
          },
        },
      };
    // bug: duplicate because of type
    case ItemType.S3_FILE:
      return {
        type,
        extra: extra ?? {
          [type]: {
            name: faker.system.fileName(),
            mimetype: faker.system.mimeType(),
            path: faker.system.filePath(),
            size: faker.number.int(),
            altText: faker.lorem.word(),
            content: faker.lorem.text(),
          },
        },
      };
    case ItemType.FOLDER:
    default:
      return {
        type,
        extra: extra ?? {
          [ItemType.FOLDER]: {
            childrenOrder: [],
          },
        },
      };
  }
};

faker.helpers.arrayElement([
  { lang: faker.helpers.arrayElement(['en', 'fr', 'de']) },
  {},
]);

type ItemFactoryType<DateType = Item['createdAt']> = Pick<
  DiscriminatedItem,
  'id' | 'name' | 'description' | 'path' | 'settings' | 'creator' | 'extra'
> & {
  updatedAt: DateType;
  createdAt: DateType;
  // extra: ItemExtraFactory(type),
};

const adaptDate = (
  date: Date,
  { dateType = 'string' }: { dateType?: 'string' | 'date' } = {},
) => {
  if (dateType === 'string') {
    return date.toISOString();
  }
  return date;
};

/**
 *
 * @param i partial item, can be omitted. The factory should build a correct item from given type (default to folder) and data
 * @param options
 * @returns
 */
export const ItemFactory = <DateType = string>(
  i: Partial<DiscriminatedItem> & { parentItem?: Pick<Item, 'path'> } = {},
  options: { dateType: 'string' | 'date' } = { dateType: 'string' },
): ItemFactoryType<DateType> => {
  const typeAndExtra = buildExtraAndType({
    type: i.type ?? ItemType.FOLDER,
    extra: i.extra,
  });
  const id = i.id ?? faker.string.uuid();
  const createdAt = faker.date.anytime();
  const updatedAt = faker.date.anytime();

  const path =
    (i.parentItem ? i.parentItem.path + '.' : '') + buildPathFromIds(id);

  return {
    id,
    name: faker.person.fullName(),
    description: faker.lorem.text(),
    createdAt: adaptDate(createdAt, options) as any, // TODO need help: depend on the generic type
    updatedAt: adaptDate(updatedAt, options) as any, // TODO need help: depend on the generic type
    ...typeAndExtra,

    settings: faker.helpers.arrayElement([
      {},
      {
        lang: faker.helpers.arrayElement(['fr', 'en']),
        isPinned: faker.datatype.boolean(),
        showChatbox: faker.datatype.boolean(),
        hasThumbnail: faker.datatype.boolean(),
        isResizable: faker.datatype.boolean(),
        isCollapsible: faker.datatype.boolean(),
        enableSaveActions: faker.datatype.boolean(),
        tags: faker.helpers.multiple(faker.lorem.word),
        displayCoEditors: faker.datatype.boolean(),
        ccLicenseAdaption: faker.helpers.enumValue(CCLicenseAdaptions),
      },
    ]),
    creator: MemberFactory(),
    path,
    ...i,
  };
};
