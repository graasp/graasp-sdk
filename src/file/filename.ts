import mime from 'mime-types';
import path from 'path';

import { ItemType, ItemTypeUnion } from '@/item/itemType.js';

const extractFileName = (itemName: string, extension: string) => {
  const fullExtension = `.${extension}`;
  const fileName = `${path.basename(itemName, fullExtension)}`;
  return `${fileName}${fullExtension}`;
};

const extractExtension = ({
  name,
  mimetype,
}: {
  name: string;
  mimetype?: string;
}): string => {
  // slice to remove . character
  const ext = path.extname(name).slice(1);
  if (!ext && mimetype) {
    return mime.extension(mimetype) || '';
  }
  return ext;
};

// use partial of item to be usable in backend
export const getFilenameFromItem = (item: {
  name: string;
  type: ItemTypeUnion;
  mimetype?: string;
}): string => {
  switch (item.type) {
    case ItemType.APP: {
      return extractFileName(item.name, 'app');
    }
    case ItemType.DOCUMENT: {
      return extractFileName(item.name, 'graasp');
    }
    case ItemType.S3_FILE:
    case ItemType.LOCAL_FILE: {
      return extractFileName(
        item.name,
        extractExtension({ name: item.name, mimetype: item.mimetype }),
      );
    }
    case ItemType.FOLDER: {
      return extractFileName(item.name, 'zip');
    }
    case ItemType.H5P: {
      return extractFileName(item.name, 'h5p');
    }
    case ItemType.LINK: {
      return extractFileName(item.name, 'url');
    }
    default:
      return item.name;
  }
};
