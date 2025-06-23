import { ItemMembership } from '../itemMembership/itemMembership.js';
import { Item } from './baseItem.js';
import { DiscriminatedItem } from './item.js';
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
export type PackedItem<S = Item> = DiscriminatedItem<S> & PackedInformation;
