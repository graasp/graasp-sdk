import { Item } from '../baseItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';

export type FolderItemType<S = ItemSettings> = {
  type: typeof ItemType.FOLDER;
  extra: FolderItemExtra;
} & Item<S>;

/**
 * Folder Extra
 */
export type FolderItemExtraProperties = {
  isCapsule?: boolean;
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
