import { ThumbnailSize } from '@/constants/ui';

export type ThumbnailSizeVariant =
  `${(typeof ThumbnailSize)[keyof typeof ThumbnailSize]}`;
