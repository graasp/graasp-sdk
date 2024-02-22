import { Item } from '../baseItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';

export type DocumentItemType<S = ItemSettings> = {
  type: typeof ItemType.DOCUMENT;
  extra: DocumentItemExtra;
} & Item<S>;

/**
 * Document style flavor defined according to severity prop of
 * https://mui.com/material-ui/react-alert/
 * Note: ordering matters (flavors list is generated from this enum)
 */
export enum DocumentItemExtraFlavor {
  None = 'none',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

/**
 * Document Extra
 */
export type DocumentItemExtraProperties = {
  content: string;
  /** Style flavor of the document's surrounding box */
  flavor?: DocumentItemExtraFlavor | `${DocumentItemExtraFlavor}`;
  /** Defines if the document should be edited in raw mode */
  isRaw?: boolean;
};
export interface DocumentItemExtra {
  [ItemType.DOCUMENT]: DocumentItemExtraProperties;
}

export const getDocumentExtra = <U extends DocumentItemExtra>(
  extra: U,
): U[typeof ItemType.DOCUMENT] => extra[ItemType.DOCUMENT];

export const buildDocumentExtra = (
  document: DocumentItemExtraProperties,
): DocumentItemExtra => ({
  [ItemType.DOCUMENT]: document,
});
