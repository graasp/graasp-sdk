import { CCLicenseAdaptions, OldCCLicenseAdaptations } from '@/constants';
import { MaxWidth } from '@/services';

export interface ItemSettings {
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
    // todo: these are the old licenses, we might remove them at some point.
    | `${OldCCLicenseAdaptations}`;
}

export interface EmbeddedLinkItemSettings extends ItemSettings {
  showLinkIframe?: boolean;
  showLinkButton?: boolean;
}

export interface FileItemSettings extends ItemSettings {
  maxWidth?: MaxWidth;
}
