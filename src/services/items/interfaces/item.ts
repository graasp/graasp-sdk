import { ItemType } from '../../../constants/itemType';
import {
  DocumentItemExtra,
  EmbeddedLinkItemExtra,
  FolderItemExtra,
  Serializable,
  ShortcutItemExtra,
  UnknownExtra,
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

export declare type ItemBase<S = ItemSettings> = {
  id: string;
  name: string;
  description: string;
  path: string;
  settings: S;
  creator: string;
  createdAt: string;
  updatedAt: string;
  type: `${ItemType}`;
  extra: UnknownExtra;
};

export declare type Item<S = ItemSettings> =
  | ({ type: `${ItemType.APP}`; extra: AppItemExtra } & ItemBase<S>)
  | ({ type: `${ItemType.DOCUMENT}`; extra: DocumentItemExtra } & ItemBase<S>)
  | ({ type: `${ItemType.FOLDER}`; extra: FolderItemExtra } & ItemBase<S>)
  | ({ type: `${ItemType.H5P}`; extra: H5PExtra } & ItemBase<S>)
  | ({ type: `${ItemType.LINK}`; extra: EmbeddedLinkItemExtra } & ItemBase<S>)
  | ({
      type: `${ItemType.LOCAL_FILE}`;
      extra: LocalFileItemExtra;
    } & ItemBase<S>)
  | ({ type: `${ItemType.S3_FILE}`; extra: S3FileItemExtra } & ItemBase<S>)
  | ({ type: `${ItemType.SHORTCUT}`; extra: ShortcutItemExtra } & ItemBase<S>)
  | ({ type: `${ItemType.ETHERPAD}`; extra: Etherpad } & ItemBase<S>);
