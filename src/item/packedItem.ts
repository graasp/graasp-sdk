import { ItemMembership } from '../itemMembership/itemMembership.js';
import { DiscriminatedItem } from './item.js';
import { ItemSettings } from './itemSettings.js';
import { ThumbnailsBySize } from '@/enums/thumbnailSizes.js';
import { ItemVisibility } from '@/itemVisibility/itemVisibility.js';

export type PackedInformation = {
  permission: ItemMembership['permission'] | null;
  hidden?: ItemVisibility;
  public?: ItemVisibility;
  thumbnails?: ThumbnailsBySize;
};

/**
 * This type is used to define an item with more data such as:
 * - permission
 */
export type PackedItem<S = ItemSettings> = DiscriminatedItem<S> &
  PackedInformation;
