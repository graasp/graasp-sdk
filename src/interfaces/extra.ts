import { ItemType } from '../constants';

/**
 * Document style flavor defined according to severity prop of
 * https://mui.com/material-ui/react-alert/
 * Note: ordering matters (flavors list is generated from this enum)
 */
export enum DocumentItemExtraFlavor {
  None = 'none',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export type DocumentItemExtraProperties = {
  content: string;
  /** Style flavor of the document's surrounding box */
  flavor?: DocumentItemExtraFlavor | `${DocumentItemExtraFlavor}`;
  /** Defines if the document should be edited in raw mode */
  isRaw?: boolean;
};

export interface DocumentItemExtra {
  [ItemType.DOCUMENT]: DocumentItemExtraProperties;
}

export type EmbeddedLinkItemExtraProperties = {
  thumbnails?: string[];
  html?: string;
  url: string;
  icons?: string[];
};

export interface EmbeddedLinkItemExtra {
  [ItemType.LINK]: EmbeddedLinkItemExtraProperties;
}

export type FolderItemExtraProperties = {
  childrenOrder: string[];
  isRoot?: boolean;
};

export interface FolderItemExtra {
  [ItemType.FOLDER]: FolderItemExtraProperties;
}

export type ShortcutItemExtraProperties = {
  target: string;
};

export interface ShortcutItemExtra {
  [ItemType.SHORTCUT]: ShortcutItemExtraProperties;
}
