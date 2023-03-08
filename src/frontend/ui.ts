/**
 * Size of Thumbnail to use
 */
export const ThumbnailSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  ORIGINAL: 'original',
} as const;
export type ThumbnailSizeVariant =
  `${(typeof ThumbnailSize)[keyof typeof ThumbnailSize]}`;
