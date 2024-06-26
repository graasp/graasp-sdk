import { UnionOfConst } from '@/typeUtils.js';

export const Alignment = {
  Center: 'center',
  Left: 'left',
  Right: 'right',
} as const;
export type AlignmentType = UnionOfConst<typeof Alignment>;

export const DEFAULT_ALIGNMENT_SETTING = Alignment.Center;

export const getAlignItemsFromAlignmentSetting = (
  alignment: AlignmentType = DEFAULT_ALIGNMENT_SETTING,
): 'flex-start' | 'flex-end' | 'center' => {
  switch (alignment) {
    case Alignment.Right:
      return 'flex-end';
    case Alignment.Left:
      return 'flex-start';
    case Alignment.Center:
      return 'center';
  }
};
