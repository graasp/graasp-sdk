import { MemberFactory } from '../members/memberFactory';
import {
  AppItemType,
  DiscriminatedItem,
  DocumentItemType,
  EmbeddedLinkItemType,
  EtherpadItemType,
  FolderItemType,
  H5PItemType,
  LocalFileItemType,
  S3FileItemType,
  ShortcutItemType,
} from './interfaces/item';
import { CCLicenseAdaptions, ItemType } from '@/constants';
import { buildPathFromIds } from '@/utils';
import { faker } from '@faker-js/faker';

export type ItemFactoryOutputType<IT extends DiscriminatedItem> = Pick<
  IT,
  | 'id'
  | 'name'
  | 'description'
  | 'path'
  | 'settings'
  | 'creator'
  | 'extra'
  | 'type'
  | 'lang'
  | 'createdAt'
  | 'updatedAt'
>;

type ItemFactoryInputType<IT extends DiscriminatedItem> = Partial<IT> & {
  parentItem?: Pick<IT, 'path'>;
};

const PartialItemFactory = <IT extends DiscriminatedItem>(
  item: ItemFactoryInputType<IT> = {},
): Omit<ItemFactoryOutputType<IT>, 'type' | 'extra'> => {
  const id = item.id ?? faker.string.uuid();
  const createdAt: string =
    item.createdAt ?? faker.date.anytime().toISOString();
  const updatedAt: string =
    item.updatedAt ?? faker.date.anytime().toISOString();

  const path =
    (item.parentItem ? item.parentItem.path + '.' : '') + buildPathFromIds(id);

  return {
    id,
    createdAt,
    updatedAt,
    path,
    name: item.name ?? faker.helpers.multiple(faker.lorem.word).join(' '),
    description: item.description ?? faker.lorem.text(),
    settings:
      item.settings ??
      faker.helpers.arrayElement([
        {},
        {
          isPinned: faker.datatype.boolean(),
          showChatbox: faker.datatype.boolean(),
          hasThumbnail: false,
          isResizable: faker.datatype.boolean(),
          isCollapsible: faker.datatype.boolean(),
          enableSaveActions: faker.datatype.boolean(),
          tags: faker.helpers.multiple(faker.lorem.word),
          displayCoEditors: faker.datatype.boolean(),
          ccLicenseAdaption: faker.helpers.enumValue(CCLicenseAdaptions),
        },
      ]),
    // allow null creator
    creator: item.creator === undefined ? MemberFactory() : item.creator,
    lang: item.lang ?? faker.helpers.arrayElement(['fr', 'en']),
  };
};

export const FolderItemFactory = (
  item: ItemFactoryInputType<FolderItemType> = {},
): ItemFactoryOutputType<FolderItemType> => {
  const newItem = PartialItemFactory({ ...item });
  return {
    ...newItem,
    type: ItemType.FOLDER,
    extra: item.extra ?? {
      [ItemType.FOLDER]: {
        childrenOrder: [],
      },
    },
  };
};

export const AppItemFactory = (
  item: ItemFactoryInputType<AppItemType> = {},
): ItemFactoryOutputType<AppItemType> => {
  const newItem = PartialItemFactory({ ...item, type: ItemType.APP });
  return {
    ...newItem,
    type: ItemType.APP,
    extra: item.extra ?? {
      [ItemType.APP]: {
        url: faker.internet.url(),
        settings: {},
      },
    },
  };
};

export const H5PItemFactory = (
  item: ItemFactoryInputType<H5PItemType> = {},
): ItemFactoryOutputType<H5PItemType> => {
  const newItem = PartialItemFactory<H5PItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.H5P,
    extra: item.extra ?? {
      [ItemType.H5P]: {
        contentId: faker.string.uuid(),
        h5pFilePath: faker.system.filePath(),
        contentFilePath: faker.system.filePath(),
      },
    },
  };
};

export const DocumentItemFactory = (
  item: ItemFactoryInputType<DocumentItemType> = {},
): ItemFactoryOutputType<DocumentItemType> => {
  const newItem = PartialItemFactory<DocumentItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.DOCUMENT,
    extra: item.extra ?? {
      [ItemType.DOCUMENT]: {
        content: `<div>${faker.lorem.text()}</div>`,
      },
    },
  };
};

export const EmbeddedLinkItemFactory = (
  item: ItemFactoryInputType<EmbeddedLinkItemType> = {},
): ItemFactoryOutputType<EmbeddedLinkItemType> => {
  const newItem = PartialItemFactory<EmbeddedLinkItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.LINK,
    extra: item.extra ?? {
      [ItemType.LINK]: {
        html: faker.helpers.arrayElement([
          `<div>${faker.lorem.text()}</div>`,
          undefined,
        ]),
        icons: faker.helpers.arrayElement([[faker.internet.url()], undefined]),
        thumbnails: faker.helpers.arrayElement([
          [faker.internet.url()],
          undefined,
        ]),
        url: faker.internet.url(),
      },
    },
  };
};

export const LocalFileItemFactory = (
  item: ItemFactoryInputType<LocalFileItemType> = {},
): ItemFactoryOutputType<LocalFileItemType> => {
  const newItem = PartialItemFactory<LocalFileItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.LOCAL_FILE,
    extra: item.extra ?? {
      [ItemType.LOCAL_FILE]: {
        name: faker.system.fileName(),
        mimetype: faker.system.mimeType(),
        path: faker.system.filePath(),
        size: faker.number.int({ min: 1 }),
        altText: faker.lorem.word(),
        content: faker.lorem.text(),
      },
    },
  };
};

export const S3FileItemFactory = (
  item: ItemFactoryInputType<S3FileItemType> = {},
): ItemFactoryOutputType<S3FileItemType> => {
  const newItem = PartialItemFactory<S3FileItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.S3_FILE,
    extra: item.extra ?? {
      [ItemType.S3_FILE]: {
        name: faker.system.fileName(),
        mimetype: faker.system.mimeType(),
        path: faker.system.filePath(),
        size: faker.number.int(),
        altText: faker.helpers.arrayElement([undefined, faker.lorem.word()]),
        content: faker.lorem.text(),
      },
    },
  };
};

export const EtherpadItemFactory = (
  item: ItemFactoryInputType<EtherpadItemType> = {},
): ItemFactoryOutputType<EtherpadItemType> => {
  const newItem = PartialItemFactory<EtherpadItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.ETHERPAD,
    extra: item.extra ?? {
      [ItemType.ETHERPAD]: {
        padID: faker.string.uuid(),
        groupID: faker.string.uuid(),
      },
    },
  };
};

export const ShortcutItemFactory = (
  item: ItemFactoryInputType<ShortcutItemType> = {},
): ItemFactoryOutputType<ShortcutItemType> => {
  const newItem = PartialItemFactory<ShortcutItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.SHORTCUT,
    extra: item.extra ?? {
      [ItemType.SHORTCUT]: {
        target: faker.string.uuid(),
      },
    },
  };
};
