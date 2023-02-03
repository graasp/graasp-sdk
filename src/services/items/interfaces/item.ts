import { ItemType } from '../../../constants/itemType';
import {
  DocumentItemExtra,
  EmbeddedLinkItemExtra,
  FolderItemExtra,
  Serializable,
  ShortcutItemExtra,
} from '../../../interfaces/extra';
import { AppItemExtra } from '../../app/';
import { Etherpad } from '../../etherpad';
import { LocalFileItemExtra, S3FileItemExtra } from '../../file';
import { H5PExtra } from '../../h5p';

export interface ItemSettings extends Serializable {
  isPinned?: boolean;
  showChatbox?: boolean;
  hasThumbnail?: boolean;
  isResizable?: boolean;
  isCollapsible?: boolean;
}

export type Item<S = ItemSettings> = {
  id: string;
  name: string;
  description: string;
  path: string;
  settings: S;
  creator: string;
  createdAt: string;
  updatedAt: string;
} & (
  | { type: ItemType.APP; extra: AppItemExtra }
  | { type: ItemType.DOCUMENT; extra: DocumentItemExtra }
  | { type: ItemType.FOLDER; extra: FolderItemExtra }
  | { type: ItemType.H5P; extra: H5PExtra }
  | { type: ItemType.LINK; extra: EmbeddedLinkItemExtra }
  | { type: ItemType.LOCAL_FILE; extra: LocalFileItemExtra }
  | { type: ItemType.S3_FILE; extra: S3FileItemExtra }
  | { type: ItemType.SHORTCUT; extra: ShortcutItemExtra }
  | { type: ItemType.ETHERPAD; extra: Etherpad }
);
