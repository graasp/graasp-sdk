import {
  AppItemExtra,
  DocumentItemExtra,
  EtherpadItemExtra,
  FolderItemExtra,
  H5PItemExtra,
  LinkItemExtra,
  LocalFileItemExtra,
  S3FileItemExtra,
  ShortcutItemExtra,
} from './itemExtra.js';
import {
  EmbeddedLinkItemSettings,
  FileItemSettings,
  ItemSettings,
} from './itemSettings.js';
import { ItemType } from './itemType.js';
import { Member } from '@/member/member.js';

interface Item<S = ItemSettings> {
  id: string;
  name: string;
  description: string | null;
  path: string;
  settings: S;
  creator: Member | null;
  createdAt: string;
  updatedAt: string;
  lang: string;
}

export type AppItemType<S = ItemSettings> = {
  type: typeof ItemType.APP;
  extra: AppItemExtra;
} & Item<S>;
export type DocumentItemType<S = ItemSettings> = {
  type: typeof ItemType.DOCUMENT;
  extra: DocumentItemExtra;
} & Item<S>;
export type FolderItemType<S = ItemSettings> = {
  type: typeof ItemType.FOLDER;
  extra: FolderItemExtra;
} & Item<S>;
export type H5PItemType<S = ItemSettings> = {
  type: typeof ItemType.H5P;
  extra: H5PItemExtra;
} & Item<S>;
export type EmbeddedLinkItemType<S = ItemSettings> = {
  type: typeof ItemType.LINK;
  extra: LinkItemExtra;
  settings: EmbeddedLinkItemSettings;
} & Item<S>;
export type LocalFileItemType = {
  type: typeof ItemType.LOCAL_FILE;
  extra: LocalFileItemExtra;
} & Item<FileItemSettings>;
export type S3FileItemType = {
  type: typeof ItemType.S3_FILE;
  extra: S3FileItemExtra;
} & Item<FileItemSettings>;
export type ShortcutItemType<S = ItemSettings> = {
  type: typeof ItemType.SHORTCUT;
  extra: ShortcutItemExtra;
} & Item<S>;
export type EtherpadItemType<S = ItemSettings> = {
  type: typeof ItemType.ETHERPAD;
  extra: EtherpadItemExtra;
} & Item<S>;

export type DiscriminatedItem<S = ItemSettings> =
  | AppItemType<S>
  | DocumentItemType<S>
  | FolderItemType<S>
  | H5PItemType<S>
  | EmbeddedLinkItemType<S>
  | LocalFileItemType
  | S3FileItemType
  | ShortcutItemType<S>
  | EtherpadItemType<S>;
