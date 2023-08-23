import { ItemType } from '../../../constants/itemType';
import {
  DocumentItemExtra,
  EmbeddedLinkItemExtra,
  FolderItemExtra,
  ShortcutItemExtra,
} from '../../../interfaces/extra';
import { AppItemExtra } from '../../app/';
import { EtherpadItemExtra } from '../../etherpad';
import {
  FileItemSettings,
  LocalFileItemExtra,
  S3FileItemExtra,
} from '../../file';
import { H5PItemExtra } from '../../h5p';
import { EmbeddedLinkItemSettings, ItemSettings } from './itemSettings';
import { Member } from '@/index';

export interface Item<S = ItemSettings> {
  id: string;
  name: string;
  description: string | null;
  path: string;
  settings: S;
  creator: Member | null;
  createdAt: Date;
  updatedAt: Date;
}

export type AppItemType<S = ItemSettings> = {
  type: `${ItemType.APP}`;
  extra: AppItemExtra;
} & Item<S>;
export type DocumentItemType<S = ItemSettings> = {
  type: `${ItemType.DOCUMENT}`;
  extra: DocumentItemExtra;
} & Item<S>;
export type FolderItemType<S = ItemSettings> = {
  type: `${ItemType.FOLDER}`;
  extra: FolderItemExtra;
} & Item<S>;
export type H5PItemType<S = ItemSettings> = {
  type: `${ItemType.H5P}`;
  extra: H5PItemExtra;
} & Item<S>;
export type EmbeddedLinkItemType<S = ItemSettings> = {
  type: `${ItemType.LINK}`;
  extra: EmbeddedLinkItemExtra;
  settings: EmbeddedLinkItemSettings;
} & Item<S>;
export type LocalFileItemType<S = FileItemSettings> = {
  type: `${ItemType.LOCAL_FILE}`;
  extra: LocalFileItemExtra;
} & Item<S>;
export type S3FileItemType<S = FileItemSettings> = {
  type: `${ItemType.S3_FILE}`;
  extra: S3FileItemExtra;
} & Item<S>;
export type ShortcutItemType<S = ItemSettings> = {
  type: `${ItemType.SHORTCUT}`;
  extra: ShortcutItemExtra;
} & Item<S>;
export type EtherpadItemType<S = ItemSettings> = {
  type: `${ItemType.ETHERPAD}`;
  extra: EtherpadItemExtra;
} & Item<S>;

export type DiscriminatedItem<S = ItemSettings> =
  | AppItemType<S>
  | DocumentItemType<S>
  | FolderItemType<S>
  | H5PItemType<S>
  | EmbeddedLinkItemType<S>
  | LocalFileItemType<S>
  | S3FileItemType<S>
  | ShortcutItemType<S>
  | EtherpadItemType<S>;
