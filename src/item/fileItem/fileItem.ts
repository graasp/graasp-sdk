import { Item } from '../baseItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';

export type LocalFileItemType = {
  type: typeof ItemType.LOCAL_FILE;
  extra: LocalFileItemExtra;
} & Item<FileItemSettings>;
export type S3FileItemType = {
  type: typeof ItemType.S3_FILE;
  extra: S3FileItemExtra;
} & Item<FileItemSettings>;

export type FileItemType = typeof ItemType.S3_FILE | typeof ItemType.LOCAL_FILE;

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
export interface LocalFileItemExtra {
  [ItemType.LOCAL_FILE]: FileItemProperties;
}
export interface S3FileItemExtra {
  [ItemType.S3_FILE]: FileItemProperties;
}
export type FileItemExtra = S3FileItemExtra | LocalFileItemExtra;

export const getFileExtra = <U extends LocalFileItemExtra>(
  extra: U,
): U[typeof ItemType.LOCAL_FILE] => extra[ItemType.LOCAL_FILE];

export const getS3FileExtra = <U extends S3FileItemExtra>(
  extra: U,
): U[typeof ItemType.S3_FILE] => extra[ItemType.S3_FILE];

export const buildFileExtra = (
  extra: FileItemProperties,
): LocalFileItemExtra => ({
  [ItemType.LOCAL_FILE]: extra,
});

export const buildS3FileExtra = (
  extra: FileItemProperties,
): S3FileItemExtra => ({
  [ItemType.S3_FILE]: extra,
});

/**
 * File Settings
 */

export interface FileItemSettings extends ItemSettings {
  maxWidth?: MaxWidth;
}

export enum MaxWidth {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}
