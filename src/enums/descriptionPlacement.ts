import { UnionOfConst } from '@/typeUtils.js';

export const DescriptionPlacement = {
  ABOVE: 'above',
  BELOW: 'below',
} as const;
export type DescriptionPlacementType = UnionOfConst<
  typeof DescriptionPlacement
>;
