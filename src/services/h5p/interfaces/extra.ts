import { ItemType } from '../../../constants';
import { UnknownExtra } from '../../../interfaces';

export type H5PItemExtraProperties = {
  /** storage ID */
  contentId: string;
  /** relative path from root storage to the uploaded .h5p package */
  h5pFilePath: string;
  /** relative path from root storage to the assets folder */
  contentFilePath: string;
};

export interface H5PItemExtra extends UnknownExtra {
  [ItemType.H5P]: H5PItemExtraProperties;
}
