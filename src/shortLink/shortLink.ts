import { UnionOfConst } from '@/typeUtils.js';

/**
 * Represents the allowed platforms for which short links can be generated.
 */
export const ShortLinkPlatform = {
  Builder: 'builder',
  Player: 'player',
  Library: 'library',
} as const;

export type ShortLink = {
  itemId: string;
  alias: string;
  platform: UnionOfConst<typeof ShortLinkPlatform>;
};

export type UpdateShortLink = Pick<ShortLink, 'alias'>;

export type ShortLinkAvailable = {
  available: boolean;
};

export type ShortLinksOfItem = {
  [K in (typeof ShortLinkPlatform)[keyof typeof ShortLinkPlatform]]?: ShortLink['alias'];
};
