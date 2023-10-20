import { ItemType } from '../../../constants';

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
  content: string;
};

export interface LocalFileItemExtra {
  [ItemType.LOCAL_FILE]: FileItemProperties;
}

export interface S3FileItemExtra {
  [ItemType.S3_FILE]: FileItemProperties;
}

export type FileItemExtra = S3FileItemExtra | LocalFileItemExtra;
