import { UnionOfConst } from '@/typeUtils.js';

export const Alignment = {
  Center: 'center',
  Left: 'left',
  Right: 'right',
} as const;
export type AlignmentType = UnionOfConst<typeof Alignment>;
