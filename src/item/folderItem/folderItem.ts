import { Item } from '../baseItem.js';
import { ItemType } from '../itemType.js';

export type FolderItemType<T = Item> = {
  type: typeof ItemType.FOLDER;
  extra: FolderItemExtra;
} & T;

/**
 * Folder Extra
 */
export type FolderItemExtraProperties = {
  isRoot?: boolean;
};
export interface FolderItemExtra {
  [ItemType.FOLDER]: FolderItemExtraProperties;
}

export const getFolderExtra = <U extends FolderItemExtra>(
  extra: U,
): U[typeof ItemType.FOLDER] => extra[ItemType.FOLDER];

export const buildFolderExtra = (
  extra: FolderItemExtraProperties,
): FolderItemExtra => ({
  [ItemType.FOLDER]: extra,
});
