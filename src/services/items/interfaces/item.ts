import { ItemType } from '../../../constants/itemType';
import {
  DocumentItemExtra,
  EmbeddedLinkItemExtra,
  FolderItemExtra,
  ShortcutItemExtra,
} from '../../../interfaces/extra';
import { AppItemExtra } from '../../app/';
import { EtherpadItemExtra } from '../../etherpad';
import { LocalFileItemExtra, S3FileItemExtra } from '../../file';
import { H5PItemExtra } from '../../h5p';
import { EmbeddedLinkItemSettings, ItemSettings } from './itemSettings';
import { Member } from '@/index';
import { FileItemSettings } from '@/services/file/interfaces/settings';

export interface Item<S = ItemSettings> {
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
  extra: EmbeddedLinkItemExtra;
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
