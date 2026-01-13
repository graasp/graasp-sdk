import { Item } from '../baseItem.js';
import { FolderItemExtra, FolderItemType } from '../folderItem/folderItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';

export type CapsuleItemType<S = ItemSettings> = {
  type: typeof ItemType.FOLDER;
  extra: FolderItemExtra;
} & Item<S>;

export const isCapsule = (item: FolderItemType | CapsuleItemType) =>
  item.extra[ItemType.FOLDER]?.isCapsule === true;
