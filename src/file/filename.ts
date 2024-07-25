import mime from 'mime-types';
import path from 'path';

import { DiscriminatedItem } from '@/item/item.js';
import { ItemType } from '@/item/itemType.js';

export const getFilenameFromItem = (item: DiscriminatedItem): string => {
  switch (item.type) {
    case ItemType.APP: {
      return `${path.basename(item.name, '.app')}${'.app'}`;
    }
    case ItemType.DOCUMENT: {
      return `${path.basename(item.name, '.graasp')}${'.graasp'}`;
    }
    case ItemType.S3_FILE:
    case ItemType.LOCAL_FILE: {
      const s3Extra =
        item.type === ItemType.S3_FILE ? item.extra.s3File : undefined;
      const localFileExtra =
        item.type === ItemType.LOCAL_FILE ? item.extra.file : undefined;
      const { mimetype } = { ...s3Extra, ...localFileExtra };

      // build filename with extension if does not exist
      let ext = path.extname(item.name);
      if (!ext && mimetype) {
        // only add a dot in case of building file name with mimetype, otherwise there will be two dots in file name
        ext = `.${mime.extension(mimetype)}`;
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
