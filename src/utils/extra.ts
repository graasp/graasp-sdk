import { ItemLoginSchema, ItemType } from '../constants';
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
import { ImmutableCast, ItemLogin } from '@/frontend/types';

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

// todo: improve extra typing
export const buildItemLoginSchemaExtra = (
  schema?: ItemLoginSchema,
): { itemLogin?: ItemLogin } =>
  schema ? { itemLogin: { loginSchema: schema } } : {};
