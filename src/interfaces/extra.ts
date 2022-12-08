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

export type DocumentItemExtraProperties = {
  content: string;
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
