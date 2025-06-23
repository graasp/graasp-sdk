import { AppItemType } from './appItem/appItem.js';
import { Item } from './baseItem.js';
import { DocumentItemType } from './documentItem/documentItem.js';
import { EtherpadItemType } from './etherpadItem/etherpadItem.js';
import {
  FileItemExtra,
  FileItemType,
  getFileExtra,
} from './fileItem/fileItem.js';
import { FolderItemType } from './folderItem/folderItem.js';
import { H5PItemType } from './h5pItem/h5pItem.js';
import { ItemType } from './itemType.js';
import { LinkItemType } from './linkItem/linkItem.js';
import { ShortcutItemType } from './shortcutItem/shortcutItem.js';

export const getMimetype = (
  extra: object | FileItemExtra,
): string | undefined => {
  if (ItemType.FILE in extra) {
    return getFileExtra(extra)?.mimetype;
  }
  return undefined;
};

export type DiscriminatedItem<T = Item> =
  | AppItemType<T>
  | DocumentItemType<T>
  | FolderItemType<T>
  | H5PItemType<T>
  | LinkItemType<T>
  | FileItemType<T>
  | ShortcutItemType<T>
  | EtherpadItemType<T>;
