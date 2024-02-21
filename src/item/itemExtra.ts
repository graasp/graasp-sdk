import { DiscriminatedItem } from './item.js';
import { ItemType } from './itemType.js';

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

/**
 * App Item
 */
export type AppItemExtraProperties = {
  url: string;
  // todo: there currently is nothing stored in the settings. this might change later
  settings?: unknown;
};
export interface AppItemExtra {
  [ItemType.APP]: AppItemExtraProperties;
}

/**
 * Document Item
 */
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

/**
 * Link Item
 */
export type LinkItemExtraProperties = {
  thumbnails?: string[];
  html?: string;
  url: string;
  icons?: string[];
};
export interface LinkItemExtra {
  [ItemType.LINK]: LinkItemExtraProperties;
}

/**
 * Folder Item
 */
export type FolderItemExtraProperties = {
  childrenOrder: string[];
  isRoot?: boolean;
};
export interface FolderItemExtra {
  [ItemType.FOLDER]: FolderItemExtraProperties;
}

/**
 * Shortcut Item
 */
export type ShortcutItemExtraProperties = {
  target: string;
};
export interface ShortcutItemExtra {
  [ItemType.SHORTCUT]: ShortcutItemExtraProperties;
}

/**
 * File Item
 */
export type FileItemProperties = {
  name: string;
  path: string;
  mimetype: string;
  size: number;
  altText?: string;
  content: string;
};
export interface LocalFileItemExtra {
  [ItemType.LOCAL_FILE]: FileItemProperties;
}
export interface S3FileItemExtra {
  [ItemType.S3_FILE]: FileItemProperties;
}
export type FileItemExtra = S3FileItemExtra | LocalFileItemExtra;

/**
 * Etherpad Item
 */
export type EtherpadItemExtraProperties = {
  padID: string;
  groupID: string;
};
export interface EtherpadItemExtra {
  [ItemType.ETHERPAD]: EtherpadItemExtraProperties;
}

/**
 * H5P Item
 */
export type H5PItemExtraProperties = {
  /** storage ID */
  contentId: string;
  /** relative path from root storage to the uploaded .h5p package */
  h5pFilePath: string;
  /** relative path from root storage to the assets folder */
  contentFilePath: string;
};
export interface H5PItemExtra {
  [ItemType.H5P]: H5PItemExtraProperties;
}

export const getFileExtra = <U extends LocalFileItemExtra>(
  extra: U,
): U[typeof ItemType.LOCAL_FILE] => extra[ItemType.LOCAL_FILE];

export const getFolderExtra = <U extends FolderItemExtra>(
  extra: U,
): U[typeof ItemType.FOLDER] => extra[ItemType.FOLDER];

export const getShortcutExtra = <U extends ShortcutItemExtra>(
  extra: U,
): U[typeof ItemType.SHORTCUT] => extra[ItemType.SHORTCUT];

export const getEtherpadExtra = <U extends EtherpadItemExtra>(
  extra: U,
): U[typeof ItemType.ETHERPAD] => extra[ItemType.ETHERPAD];

export const getS3FileExtra = <U extends S3FileItemExtra>(
  extra: U,
): U[typeof ItemType.S3_FILE] => extra[ItemType.S3_FILE];

export const getLinkExtra = <U extends LinkItemExtra>(
  extra: U,
): U[typeof ItemType.LINK] => extra[ItemType.LINK];

export const getDocumentExtra = <U extends DocumentItemExtra>(
  extra: U,
): U[typeof ItemType.DOCUMENT] => extra[ItemType.DOCUMENT];

export const getAppExtra = <U extends AppItemExtra>(
  extra: U,
): U[typeof ItemType.APP] => extra[ItemType.APP];

export const getH5PExtra = <U extends H5PItemExtra>(
  extra: U,
): U[typeof ItemType.H5P] => extra[ItemType.H5P];

export const getMimetype = (
  extra: DiscriminatedItem['extra'],
): string | undefined => {
  if (ItemType.LOCAL_FILE in extra) {
    return getFileExtra(extra)?.mimetype;
  }
  if (ItemType.S3_FILE in extra) {
    return getS3FileExtra(extra)?.mimetype;
  }
  return undefined;
};

export const buildDocumentExtra = (
  document: DocumentItemExtraProperties,
): DocumentItemExtra => ({
  [ItemType.DOCUMENT]: document,
});

export const buildFileExtra = (
  file: FileItemProperties,
): LocalFileItemExtra => ({
  [ItemType.LOCAL_FILE]: file,
});

export const buildS3FileExtra = (
  s3File: FileItemProperties,
): S3FileItemExtra => ({
  [ItemType.S3_FILE]: s3File,
});

export const buildEmbeddedLinkExtra = (
  embeddedLink: LinkItemExtraProperties,
): LinkItemExtra => ({
  [ItemType.LINK]: embeddedLink,
});

export const buildShortcutExtra = (target: string): ShortcutItemExtra => ({
  [ItemType.SHORTCUT]: { target },
});
