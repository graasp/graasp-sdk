import { Item } from '../baseItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';

export type H5PItemType<S = ItemSettings> = {
  type: typeof ItemType.H5P;
  extra: H5PItemExtra;
} & Item<S>;

/**
 * H5P Extra
 */
export type H5PItemExtraProperties = {
  /** storage ID */
  contentId: string;
  /** relative path from root storage to the uploaded .h5p package */
  h5pFilePath: string;
  /** relative path from root storage to the assets folder */
  contentFilePath: string;
};
export interface H5PItemExtra {
  [ItemType.H5P]: H5PItemExtraProperties;
}

export const getH5PExtra = <U extends H5PItemExtra>(
  extra: U,
): U[typeof ItemType.H5P] => extra[ItemType.H5P];

export const buildH5PExtra = (extra: H5PItemExtraProperties): H5PItemExtra => ({
  [ItemType.H5P]: extra,
});
