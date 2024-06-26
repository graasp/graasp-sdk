import { AlignmentType } from '@/enums/alignment.js';
import {
  CCLicenseAdaptions,
  OldCCLicenseAdaptations,
} from '@/enums/ccLicenses.js';
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
  tags?: string[];
  displayCoEditors?: boolean;
  // allow null to delete setting in the backend
  ccLicenseAdaption?: Nullable<
    | `${CCLicenseAdaptions}`
    | CCLicenseAdaptions
    // TODO: these are the old licenses, we might remove them at some point.
    | `${OldCCLicenseAdaptations}`
  >;
  descriptionPlacement?: DescriptionPlacementType;
  alignment?: AlignmentType;
};
