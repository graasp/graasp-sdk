import { ItemType } from '../../../constants/itemType';
import {
  DocumentItemExtra,
  EmbeddedLinkItemExtra,
  FolderItemExtra,
  Serializable,
  ShortcutItemExtra,
} from '../../../interfaces/extra';
import { AppItemExtra } from '../../app/';
import { EtherpadItemExtra } from '../../etherpad';
import { LocalFileItemExtra, S3FileItemExtra } from '../../file';
import { H5PItemExtra } from '../../h5p';

export interface ItemSettings extends Serializable {
  isPinned?: boolean;
  showChatbox?: boolean;
  hasThumbnail?: boolean;
  isResizable?: boolean;
  isCollapsible?: boolean;
  enableSaveActions?: boolean;
}

export interface ItemBase<S = ItemSettings> {
  id: string;
  name: string;
  description: string;
  path: string;
  settings: S;
  type: ItemType | `${ItemType}`;
  extra: unknown;
  creator: string;
  createdAt: string;
  updatedAt: string;
}

export type AppItemType<S = ItemSettings> = {
  type: `${ItemType.APP}`;
  extra: AppItemExtra;
} & ItemBase<S>;
export type DocumentItemType<S = ItemSettings> = {
  type: `${ItemType.DOCUMENT}`;
  extra: DocumentItemExtra;
} & ItemBase<S>;
export type FolderItemType<S = ItemSettings> = {
  type: `${ItemType.FOLDER}`;
  extra: FolderItemExtra;
} & ItemBase<S>;
export type H5PItemType<S = ItemSettings> = {
  type: `${ItemType.H5P}`;
  extra: H5PItemExtra;
} & ItemBase<S>;
export type EmbeddedLinkItemType<S = ItemSettings> = {
  type: `${ItemType.LINK}`;
  extra: EmbeddedLinkItemExtra;
} & ItemBase<S>;
export type LocalFileItemType<S = ItemSettings> = {
  type: `${ItemType.LOCAL_FILE}`;
  extra: LocalFileItemExtra;
} & ItemBase<S>;
export type S3FileItemType<S = ItemSettings> = {
  type: `${ItemType.S3_FILE}`;
  extra: S3FileItemExtra;
} & ItemBase<S>;
export type ShortcutItemType<S = ItemSettings> = {
  type: `${ItemType.SHORTCUT}`;
  extra: ShortcutItemExtra;
} & ItemBase<S>;
export type EtherpadItemType<S = ItemSettings> = {
  type: `${ItemType.ETHERPAD}`;
  extra: EtherpadItemExtra;
} & ItemBase<S>;

export type Item<S = ItemSettings> =
  | AppItemType<S>
  | DocumentItemType<S>
  | FolderItemType<S>
  | H5PItemType<S>
  | EmbeddedLinkItemType<S>
  | LocalFileItemType<S>
  | S3FileItemType<S>
  | ShortcutItemType<S>
  | EtherpadItemType<S>;
