import { ItemType } from '../../../constants';

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
