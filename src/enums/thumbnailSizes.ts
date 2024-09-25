import { UnionOfConst } from '@/typeUtils.js';

/**
 * Size of Thumbnail to use
 */
export const ThumbnailSize = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  Original: 'original',
} as const;
export type ThumbnailSizeType = UnionOfConst<typeof ThumbnailSize>;

// This type is defined here in the same file as ThumbnailSize.
// Indeed, if defined in PackedItem, the transpiled type contains any.
export const ThumbnailSizeInPackedItem = {
  [ThumbnailSize.Small]: ThumbnailSize.Small,
  [ThumbnailSize.Medium]: ThumbnailSize.Medium,
} as const;
export type ThumbnailsBySize = {
  [thumbnailSize in UnionOfConst<typeof ThumbnailSizeInPackedItem>]: string;
};
