import { ItemMembership } from '../itemMembership/itemMembership.js';
import { DiscriminatedItem } from './item.js';
import { ItemSettings } from './itemSettings.js';
import { ThumbnailSize } from '@/enums/thumbnailSizes.js';
import { ItemTag } from '@/itemTag/itemTag.js';
import { UnionOfConst } from '@/typeUtils.js';

export const ThumbnailSizeInPackedItem = {
  [ThumbnailSize.Small]: ThumbnailSize.Small,
  [ThumbnailSize.Medium]: ThumbnailSize.Medium,
} as const;
export type ThumbnailsBySize = {
  [thumbnailSize in UnionOfConst<typeof ThumbnailSizeInPackedItem>]: string;
};

export type PackedInformation = {
  permission: ItemMembership['permission'] | null;
  hidden?: ItemTag;
  public?: ItemTag;
  thumbnails?: ThumbnailsBySize;
};

/**
 * This type is used to define an item with more data such as:
 * - permission
 */
export type PackedItem<S = ItemSettings> = DiscriminatedItem<S> &
  PackedInformation;
