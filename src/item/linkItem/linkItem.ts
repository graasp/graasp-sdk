import { Item } from '../baseItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';

export type LinkItemType<S = Item> = {
  type: typeof ItemType.LINK;
  extra: LinkItemExtra;
  settings: LinkItemSettings;
} & S;

/**
 * Link Extra
 */
export type LinkItemExtraProperties = {
  /**
   * Link URL
   */
  url: string;
  /**
   * Contains automatic thumbnails for the page, usually better used for large cards or banners
   */
  thumbnails?: string[];
  /**
   * Contains automatic icons for the page, usually better used as thumbnails as they
   * are commonly extracted from the favicon of the site
   */
  icons?: string[];
  /**
   * HTML integration code for rich media
   * Usually contains code that loads a media player for Youtube videos etc.
   *
   * Should not be editable by users as it is directly used and can't be sanitized as
   * it would remove the integration code/iframe
   */
  html?: string;
  /**
   * Contains automatic page description extracted
   * Used to be displayed in fancy link card, or anywhere the original website description is needed
   */
  description?: string;
};
export interface LinkItemExtra {
  [ItemType.LINK]: LinkItemExtraProperties;
}

export const getLinkExtra = <U extends LinkItemExtra>(
  extra: U,
): U[typeof ItemType.LINK] => extra[ItemType.LINK];

/**
 * Returns url for a link given its extra
 * Prioritize icons for small size
 * @param {LinkItemExtra} extra
 * @param {ThumbnailSizeType} [size=ThumbnailSize.Medium] size
 * @returns url if exists, undefined otherwise
 */
export const getLinkThumbnailUrl = (
  extra: LinkItemExtra,
): string | undefined => {
  const { thumbnails, icons } = getLinkExtra(extra);
  return thumbnails?.[0] ?? icons?.[0];
};

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
