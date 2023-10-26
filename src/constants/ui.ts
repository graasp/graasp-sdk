import { UnionOfConst } from '@/types';

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

export type ThumbnailSizeVariant =
  `${(typeof ThumbnailSize)[keyof typeof ThumbnailSize]}`;
