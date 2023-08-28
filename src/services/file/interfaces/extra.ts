import { ItemType } from '../../../constants';
import { UnknownExtra } from '../../../interfaces';

export enum MaxWidth {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

/**
 * @deprecated Use FileItemProperties instead
 */
export type FileProperties = {
  name: string;
  path: string;
  mimetype: string;
};

export type FileItemProperties = {
  name: string;
  path: string;
  mimetype: string;
  size: number;
  altText?: string;
};

export interface LocalFileItemExtra extends UnknownExtra {
  [ItemType.LOCAL_FILE]: FileItemProperties;
}

export interface S3FileItemExtra extends UnknownExtra {
  [ItemType.S3_FILE]: FileItemProperties;
}

export type FileItemExtra = S3FileItemExtra | LocalFileItemExtra;
