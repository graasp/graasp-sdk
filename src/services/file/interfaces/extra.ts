import { ItemType } from '../../../constants';
import { UnknownExtra } from '../../../interfaces';

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
};

export interface LocalFileItemExtra extends UnknownExtra {
  [ItemType.LOCAL_FILE]: FileItemProperties;
}

export interface S3FileItemExtra extends UnknownExtra {
  [ItemType.S3_FILE]: FileItemProperties;
}

export type FileItemExtra = S3FileItemExtra | LocalFileItemExtra;
