import { Item } from '../baseItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';
import { AlignmentType } from '@/enums/alignment.js';

export type FileItemType = {
  type: typeof ItemType.FILE;
  extra: FileItemExtra;
} & Item<FileItemSettings>;

/**
 * File Extra
 */
export type FileItemProperties = {
  name: string;
  path: string;
  mimetype: string;
  size: number;
  altText?: string;
  content: string;
};

export type FileItemMetadata = {
  id: string;
  name: string;
  path: string;
  size: number;
  updatedAt: string;
  parent?: {
    id: string;
    name: string;
  };
};

export interface FileItemExtra {
  [ItemType.FILE]: FileItemProperties;
}

export const getFileExtra = <U extends FileItemExtra>(
  extra: U,
): U[typeof ItemType.FILE] => extra[ItemType.FILE];

export const buildFileExtra = (extra: FileItemProperties): FileItemExtra => ({
  [ItemType.FILE]: extra,
});

/**
 * Extract extension from filename.
 * @param fileName Name of the file to get the extension from
 * @param options Options object, currently contains `includeDot` to return the extension with a leading dot, for easy concatenation, this option is true by default
 * @returns
 */
export const getFileExtension = (
  fileName: string,
  { includeDot = true } = {},
): string | undefined => {
  // this code has been adapted from https://stackoverflow.com/a/680982
  const extensionRegex = /(?:\.([^.]+))?$/;
  const extension = extensionRegex.exec(fileName)?.[1];
  if (extension) {
    if (includeDot) {
      return `.${extension}`;
    }
    return extension;
  }
};

/**
 * File Settings
 */

export interface FileItemSettings extends ItemSettings {
  maxWidth?: MaxWidth;
  alignment?: AlignmentType;
}

export enum MaxWidth {
  ExtraSmall = 'xs',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

export const DEFAULT_FILE_MAX_WIDTH_SETTING = MaxWidth.Medium;
