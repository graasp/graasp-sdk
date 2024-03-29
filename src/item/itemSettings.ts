import {
  CCLicenseAdaptions,
  OldCCLicenseAdaptations,
} from '@/enums/ccLicenses.js';
import { DescriptionPlacementType } from '@/enums/descriptionPlacement.js';

export interface ItemSettings {
  /** @deprecated use item.lang */
  lang?: string;
  isPinned?: boolean;
  showChatbox?: boolean;
  hasThumbnail?: boolean;
  isResizable?: boolean;
  isCollapsible?: boolean;
  enableSaveActions?: boolean;
  tags?: string[];
  displayCoEditors?: boolean;
  ccLicenseAdaption?:
    | `${CCLicenseAdaptions}`
    | CCLicenseAdaptions
    // TODO: these are the old licenses, we might remove them at some point.
    | `${OldCCLicenseAdaptations}`;
  descriptionPlacement?: DescriptionPlacementType;
}
