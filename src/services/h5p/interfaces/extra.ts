import { ItemType } from '../../../constants';
import { UnknownExtra } from '../../../interfaces';

export interface H5PExtra extends UnknownExtra {
  [ItemType.H5P]: {
    /** storage ID */
    contentId: string;
    /** relative path from root storage to the uploaded .h5p package */
    h5pFilePath: string;
    /** relative path from root storage to the assets folder */
    contentFilePath: string;
  };
}
