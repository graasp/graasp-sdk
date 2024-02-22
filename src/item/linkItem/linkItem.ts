import { Item } from '../baseItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';

export type LinkItemType<S = ItemSettings> = {
  type: typeof ItemType.LINK;
  extra: LinkItemExtra;
  settings: LinkItemSettings;
} & Item<S>;

/**
 * Link Extra
 */
export type LinkItemExtraProperties = {
  thumbnails?: string[];
  html?: string;
  url: string;
  icons?: string[];
};
export interface LinkItemExtra {
  [ItemType.LINK]: LinkItemExtraProperties;
}

export const getLinkExtra = <U extends LinkItemExtra>(
  extra: U,
): U[typeof ItemType.LINK] => extra[ItemType.LINK];

export const buildLinkExtra = (
  extra: LinkItemExtraProperties,
): LinkItemExtra => ({
  [ItemType.LINK]: extra,
});

/**
 * Link Settings
 */
export interface LinkItemSettings extends ItemSettings {
  showLinkIframe?: boolean;
  showLinkButton?: boolean;
}
