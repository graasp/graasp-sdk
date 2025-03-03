import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PackedInformationFactory,
  PackedInformationFactoryInput,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { FileItemType } from './fileItem.js';
import { faker } from '@faker-js/faker';

export const FileItemFactory = (
  item: ItemFactoryInputType<FileItemType> = {},
): ItemFactoryOutputType<FileItemType> => {
  const newItem = PartialItemFactory<FileItemType>({
    ...item,
  });
  return {
    ...newItem,
    type: ItemType.FILE,
    extra: item.extra ?? {
      [ItemType.FILE]: {
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

export const PackedFileItemFactory = (
  item: ItemFactoryInputType<FileItemType> = {},
  packedInfo: PackedInformationFactoryInput = {},
): ItemFactoryOutputType<FileItemType> => {
  const newItem = FileItemFactory(item);
  const packed = PackedInformationFactory(packedInfo, newItem, item.parentItem);
  return {
    ...newItem,
    ...packed,
  };
};
