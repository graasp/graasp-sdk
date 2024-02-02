import { MemberFactory } from '../members/memberFactory';
import { DiscriminatedItem } from './interfaces/item';
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
            content: `<div>${faker.lorem.text()}</div>`,
          },
        },
      };
    case ItemType.LINK:
      return {
        type,
        extra: extra ?? {
          [ItemType.LINK]: {
            html: `<div>${faker.lorem.text()}</div>`,
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

type ItemFactoryOutputType<DateType = DiscriminatedItem['createdAt']> = Pick<
  DiscriminatedItem,
  'id' | 'name' | 'description' | 'path' | 'settings' | 'creator' | 'extra'
> & {
  updatedAt: DateType;
  createdAt: DateType;
  // extra: ItemExtraFactory(type),
};

type ItemFactoryInputType = Partial<DiscriminatedItem> & {
  parentItem?: Pick<DiscriminatedItem, 'path'>;
};

/**
 *
 * @param i partial item, can be omitted. The factory should build a correct item from given type (default to folder) and data
 * @param options
 * @returns
 */
export const ItemFactory = (
  item: ItemFactoryInputType = {},
): ItemFactoryOutputType<string> => {
  const typeAndExtra = buildExtraAndType({
    type: item.type ?? ItemType.FOLDER,
    extra: item.extra,
  });
  const id = item.id ?? faker.string.uuid();
  const createdAt: string = faker.date.anytime().toISOString();
  const updatedAt: string = new Date(
    new Date(createdAt).getTime() + faker.number.int(),
  ).toISOString();

  const path =
    (item.parentItem ? item.parentItem.path + '.' : '') + buildPathFromIds(id);

  return {
    id,
    name: faker.person.fullName(),
    description: faker.lorem.text(),
    createdAt,
    updatedAt,
    ...typeAndExtra,

    settings: faker.helpers.arrayElement([
      {},
      {
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
    lang: faker.helpers.arrayElement(['fr', 'en']),
    ...item,
  };
};

export const ItemFactoryAsDate = (
  item: ItemFactoryInputType,
): ItemFactoryOutputType<Date> => {
  const newItem = ItemFactory(item);
  return {
    ...newItem,
    updatedAt: new Date(newItem.updatedAt),
    createdAt: new Date(newItem.createdAt),
  };
};
