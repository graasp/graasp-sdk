import { ItemType } from '../../../constants';
import { UnknownExtra } from '../../../interfaces';

export type ScormItemExtraProperties = {
  /** storage ID */
  contentId: string;
  /** relative path from root storage to the uploaded package */
  packagePath: string;
  /** relative path from root storage to the assets folder */
  contentFilePath: string;
};

export interface ScormItemExtra extends UnknownExtra {
  [ItemType.SCORM]: ScormItemExtraProperties;
}
