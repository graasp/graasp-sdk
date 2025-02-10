import { AppItemType } from './appItem/appItem.js';
import { DocumentItemType } from './documentItem/documentItem.js';
import { EtherpadItemType } from './etherpadItem/etherpadItem.js';
import { FileItemType, getFileExtra } from './fileItem/fileItem.js';
import { FolderItemType } from './folderItem/folderItem.js';
import { H5PItemType } from './h5pItem/h5pItem.js';
import { ItemSettings } from './itemSettings.js';
import { ItemType } from './itemType.js';
import { LinkItemType } from './linkItem/linkItem.js';
import { ShortcutItemType } from './shortcutItem/shortcutItem.js';

export const getMimetype = (
  extra: DiscriminatedItem['extra'],
): string | undefined => {
  if (ItemType.FILE in extra) {
    return getFileExtra(extra)?.mimetype;
  }
  return undefined;
};

export type DiscriminatedItem<S = ItemSettings> =
  | AppItemType<S>
  | DocumentItemType<S>
  | FolderItemType<S>
  | H5PItemType<S>
  | LinkItemType<S>
  | FileItemType
  | ShortcutItemType<S>
  | EtherpadItemType<S>;
