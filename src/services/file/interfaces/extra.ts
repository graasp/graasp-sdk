import { ItemType } from '../../../constants';
import { UnknownExtra } from '../../../interfaces';
import { ItemSettings } from '@/services/items/interfaces/itemSettings';

export enum MaxWidth {
  Small = 'xs',
  Medium = 'md',
  Large = 'lg',
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

export interface FileItemSettings extends ItemSettings {
  maxWidth?: MaxWidth | false;
}
