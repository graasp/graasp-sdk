import { ItemType } from '../constants';
import {
  DocumentItemExtra,
  DocumentItemExtraProperties,
  EmbeddedLinkItemExtra,
  EmbeddedLinkItemExtraProperties,
  FolderItemExtra,
  ShortcutItemExtra,
} from '../interfaces';
import {
  AppItemExtra,
  EtherpadItemExtra,
  FileItemProperties,
  H5PItemExtra,
  LocalFileItemExtra,
  S3FileItemExtra,
} from '../services';
import { ImmutableCast } from '@/frontend/types';

export const getFileExtra = <
  U extends LocalFileItemExtra | ImmutableCast<LocalFileItemExtra>,
>(
  extra: U,
): U[typeof ItemType.LOCAL_FILE] => extra[ItemType.LOCAL_FILE];

export const getFolderExtra = <
  U extends FolderItemExtra | ImmutableCast<FolderItemExtra>,
>(
  extra: U,
): U[typeof ItemType.FOLDER] => extra[ItemType.FOLDER];

export const getShortcutExtra = <
  U extends ShortcutItemExtra | ImmutableCast<ShortcutItemExtra>,
>(
  extra: U,
): U[typeof ItemType.SHORTCUT] => extra[ItemType.SHORTCUT];

export const getEtherpadExtra = <
  U extends EtherpadItemExtra | ImmutableCast<EtherpadItemExtra>,
>(
  extra: U,
): U[typeof ItemType.ETHERPAD] => extra[ItemType.ETHERPAD];

export const getS3FileExtra = <
  U extends S3FileItemExtra | ImmutableCast<S3FileItemExtra>,
>(
  extra: U,
): U[typeof ItemType.S3_FILE] => extra[ItemType.S3_FILE];

export const getEmbeddedLinkExtra = <
  U extends EmbeddedLinkItemExtra | ImmutableCast<EmbeddedLinkItemExtra>,
>(
  extra: U,
): U[typeof ItemType.LINK] => extra[ItemType.LINK];

export const getDocumentExtra = <
  U extends DocumentItemExtra | ImmutableCast<DocumentItemExtra>,
>(
  extra: U,
): U[typeof ItemType.DOCUMENT] => extra[ItemType.DOCUMENT];

export const getAppExtra = <
  U extends AppItemExtra | ImmutableCast<AppItemExtra>,
>(
  extra: U,
): U[typeof ItemType.APP] => extra[ItemType.APP];

export const getH5PExtra = <
  U extends H5PItemExtra | ImmutableCast<H5PItemExtra>,
>(
  extra: U,
): U[typeof ItemType.H5P] => extra[ItemType.H5P];

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
  embeddedLink: EmbeddedLinkItemExtraProperties,
): EmbeddedLinkItemExtra => ({
  [ItemType.LINK]: embeddedLink,
});

export const buildShortcutExtra = (target: string): ShortcutItemExtra => ({
  [ItemType.SHORTCUT]: { target },
});
