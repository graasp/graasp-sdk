import { ItemType } from '../constants';
import {
  DocumentItemExtra,
  EmbeddedLinkItemExtra,
  FolderItemExtra,
  ShortcutItemExtra,
} from '../interfaces';
import {
  AppItemExtra,
  EtherpadItemExtra,
  H5PItemExtra,
  LocalFileItemExtra,
  S3FileItemExtra,
} from '../services';
import { ImmutableCast } from '@/frontend/types';

export const getFileExtra = <
  U extends LocalFileItemExtra | ImmutableCast<LocalFileItemExtra>,
>(
  extra?: U,
): U[ItemType.LOCAL_FILE] | undefined => extra?.[ItemType.LOCAL_FILE];

export const getFolderExtra = <
  U extends FolderItemExtra | ImmutableCast<FolderItemExtra>,
>(
  extra?: U,
): U[ItemType.FOLDER] | undefined => extra?.[ItemType.FOLDER];

export const getShortcutExtra = <
  U extends ShortcutItemExtra | ImmutableCast<ShortcutItemExtra>,
>(
  extra?: U,
): U[ItemType.SHORTCUT] | undefined => extra?.[ItemType.SHORTCUT];

export const getEtherpadExtra = <
  U extends EtherpadItemExtra | ImmutableCast<EtherpadItemExtra>,
>(
  extra?: U,
): U[ItemType.ETHERPAD] | undefined => extra?.[ItemType.ETHERPAD];

export const getS3FileExtra = <
  U extends S3FileItemExtra | ImmutableCast<S3FileItemExtra>,
>(
  extra?: U,
): U[ItemType.S3_FILE] | undefined => extra?.[ItemType.S3_FILE];

export const getEmbeddedLinkExtra = <
  U extends EmbeddedLinkItemExtra | ImmutableCast<EmbeddedLinkItemExtra>,
>(
  extra?: U,
): U[ItemType.LINK] | undefined => extra?.[ItemType.LINK];

export const getDocumentExtra = <
  U extends DocumentItemExtra | ImmutableCast<DocumentItemExtra>,
>(
  extra?: U,
): U[ItemType.DOCUMENT] | undefined => extra?.[ItemType.DOCUMENT];

export const getAppExtra = <
  U extends AppItemExtra | ImmutableCast<AppItemExtra>,
>(
  extra?: U,
): U[ItemType.APP] | undefined => extra?.[ItemType.APP];

export const getH5PExtra = <
  U extends H5PItemExtra | ImmutableCast<H5PItemExtra>,
>(
  extra?: U,
): U[ItemType.H5P] | undefined => extra?.[ItemType.H5P];
