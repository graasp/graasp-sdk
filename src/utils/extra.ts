import { ItemType } from '../constants';
import {
  DocumentItemExtra,
  DocumentItemExtraProperties,
  EmbeddedLinkItemExtra,
  EmbeddedLinkItemExtraProperties,
} from '../interfaces';
import {
  AppItemExtra,
  AppItemExtraProperties,
  FileItemProperties,
  LocalFileItemExtra,
  S3FileItemExtra,
} from '../services';

export const getFileExtra = (
  extra?: LocalFileItemExtra,
): FileItemProperties | undefined => extra?.[ItemType.LOCAL_FILE];

export const getS3FileExtra = (
  extra?: S3FileItemExtra,
): FileItemProperties | undefined => extra?.[ItemType.S3_FILE];

export const getEmbeddedLinkExtra = (
  extra?: EmbeddedLinkItemExtra,
): EmbeddedLinkItemExtraProperties | undefined => extra?.[ItemType.LINK];

export const getDocumentExtra = (
  extra?: DocumentItemExtra,
): DocumentItemExtraProperties | undefined => extra?.[ItemType.DOCUMENT];

export const getAppExtra = (
  extra?: AppItemExtra,
): AppItemExtraProperties | undefined => extra?.[ItemType.APP];
