import { ItemMembership } from '../itemMembership/itemMembership.js';
import { DiscriminatedItem } from './item.js';
import { ItemSettings } from './itemSettings.js';
import { ItemTag } from '@/itemTag/itemTag.js';

export type PackedInformation = {
  permission: ItemMembership['permission'] | null;
  hidden?: ItemTag;
  public?: ItemTag;
};

/**
 * This type is used to define an item with more data such as:
 * - permission
 */
export type PackedItem<S = ItemSettings> = DiscriminatedItem<S> &
  PackedInformation;
