import { CCLicenseAdaptions } from '@/enums/ccLicenses.js';
import { DescriptionPlacementType } from '@/enums/descriptionPlacement.js';
import { Nullable } from '@/typeUtils.js';

export type ItemSettings = {
  /** @deprecated use item.lang */
  lang?: string;
  isPinned?: boolean;
  showChatbox?: boolean;
  hasThumbnail?: boolean;
  isResizable?: boolean;
  isCollapsible?: boolean;
  enableSaveActions?: boolean;
  /**
   * @deprecated use entities tags and item tags instead
   */
  tags?: string[];
  displayCoEditors?: boolean;
  // allow null to delete setting in the backend
  ccLicenseAdaption?: Nullable<`${CCLicenseAdaptions}` | CCLicenseAdaptions>;
  descriptionPlacement?: DescriptionPlacementType;
};
