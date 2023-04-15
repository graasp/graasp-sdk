import { ItemType } from '../constants';

export declare type Anything =
  | string
  | number
  | boolean
  | null
  | undefined
  | Anything[]
  | {
      [key: string]: Anything;
    };
export interface UnknownExtra {
  [key: string]: Anything;
}
export interface Serializable {
  [key: string]: Anything;
}

/**
 * Document style flavor defined according to severity prop of
 * https://mui.com/material-ui/react-alert/
 * Note: ordering matters (flavors list is generated from this enum)
 */
export enum DocumentItemExtraFlavor {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export type DocumentItemExtraProperties = {
  content: string;
  /** Style flavor of the document's surrounding box */
  flavor?: DocumentItemExtraFlavor | `${DocumentItemExtraFlavor}`;
};

export interface DocumentItemExtra extends UnknownExtra {
  [ItemType.DOCUMENT]: DocumentItemExtraProperties;
}

export type EmbeddedLinkItemExtraProperties = {
  thumbnails: string[];
  html: string;
  url: string;
  icons: string[];
};

export interface EmbeddedLinkItemExtra extends UnknownExtra {
  [ItemType.LINK]: EmbeddedLinkItemExtraProperties;
}

export type FolderItemExtraProperties = {
  childrenOrder: string[];
  isRoot?: boolean;
};

export interface FolderItemExtra extends UnknownExtra {
  [ItemType.FOLDER]: FolderItemExtraProperties;
}

export type ShortcutItemExtraProperties = {
  target: string;
};

export interface ShortcutItemExtra extends UnknownExtra {
  [ItemType.SHORTCUT]: ShortcutItemExtraProperties;
}
