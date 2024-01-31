import { CCLicenseAdaptions, OldCCLicenseAdaptations } from '@/constants';

export interface ItemSettings {
  /** @deprecated use item.language */
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
