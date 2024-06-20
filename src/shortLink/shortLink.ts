import { AnyOfExcept, UnionOfConst } from '@/typeUtils.js';

// This const is used to define the allowed Platforms.
// It is used in schema or database enums.
export const ShortLinkPlatform = {
  Builder: 'builder',
  Player: 'player',
  Library: 'library',
} as const;

export type ShortLink = {
  alias: string;
  platform: UnionOfConst<typeof ShortLinkPlatform>;
  item: { id: string };
  createdAt: string;
};

export type ShortLinkItemId = {
  itemId: string;
};

export type ShortLinkPayload = Omit<ShortLink, 'createdAt' | 'item'> &
  ShortLinkItemId;
export type ShortLinkPostPayload = ShortLinkPayload;
export type ShortLinkPatchPayload = AnyOfExcept<ShortLinkPostPayload, 'itemId'>;
export type ShortLinkPutPayload = Omit<ShortLinkPayload, 'itemId'>;
export type ShortLinkAvailable = {
  available: boolean;
};
