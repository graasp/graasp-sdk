import { UnionOfConst } from '@/typeUtils.js';

export const Alignment = {
  Center: 'center',
  Left: 'left',
  Right: 'right',
} as const;
export type AlignmentType = UnionOfConst<typeof Alignment>;

export const getAlignItemsFromAlignmentSetting = (
  alignment: AlignmentType,
): 'flex-start' | 'flex-end' | 'center' => {
  switch (alignment) {
    case Alignment.Right:
      return 'flex-end';
    case Alignment.Center:
      return 'center';
    case Alignment.Left:
    default:
      return 'flex-start';
  }
};

export const DEFAULT_ALIGNMENT_SETTING = Alignment.Center;
