import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PackedInformationFactory,
  PackedInformationFactoryInput,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { LocalFileItemType, S3FileItemType } from './fileItem.js';
import { faker } from '@faker-js/faker';

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
        size: faker.number.int({ max: 100, min: 1 }),
        altText: faker.helpers.arrayElement([undefined, faker.lorem.word()]),
        content: faker.lorem.text(),
      },
    },
  };
};

export const PackedLocalFileItemFactory = (
  item: ItemFactoryInputType<LocalFileItemType> = {},
  packedInfo: PackedInformationFactoryInput = {},
): ItemFactoryOutputType<LocalFileItemType> => {
  const newItem = LocalFileItemFactory(item);
  const packed = PackedInformationFactory(packedInfo, newItem);
  return {
    ...newItem,
    ...packed,
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
        size: faker.number.int({ max: 100, min: 1 }),
        altText: faker.helpers.arrayElement([undefined, faker.lorem.word()]),
        content: faker.lorem.text(),
      },
    },
  };
};

export const PackedS3FileItemFactory = (
  item: ItemFactoryInputType<S3FileItemType> = {},
  packedInfo: PackedInformationFactoryInput = {},
): ItemFactoryOutputType<S3FileItemType> => {
  const newItem = S3FileItemFactory(item);
  const packed = PackedInformationFactory(packedInfo, newItem);
  return {
    ...newItem,
    ...packed,
  };
};
