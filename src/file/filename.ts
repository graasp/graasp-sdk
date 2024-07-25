import mime from 'mime-types';
import path from 'path';

import { ItemType, ItemTypeUnion } from '@/item/itemType.js';

// use partial of item to be usable in backend
export const getFilenameFromItem = (item: {
  name: string;
  type: ItemTypeUnion;
  mimetype?: string;
}): string => {
  switch (item.type) {
    case ItemType.APP: {
      return `${path.basename(item.name, '.app')}${'.app'}`;
    }
    case ItemType.DOCUMENT: {
      return `${path.basename(item.name, '.graasp')}${'.graasp'}`;
    }
    case ItemType.S3_FILE:
    case ItemType.LOCAL_FILE: {
      // build filename with extension if does not exist
      let ext = path.extname(item.name);
      if (!ext && item.mimetype) {
        // only add a dot in case of building file name with mimetype, otherwise there will be two dots in file name
        ext = `.${mime.extension(item.mimetype)}`;
      }
      return `${path.basename(item.name, ext)}${ext}`;
    }
    case ItemType.FOLDER: {
      return `${item.name}.zip`;
    }
    case ItemType.H5P: {
      return `${path.basename(item.name, '.h5p')}${'.h5p'}`;
    }
    case ItemType.LINK: {
      return `${path.basename(item.name, '.url')}${'.url'}`;
    }
    default:
      return item.name;
  }
};
