import { ItemSettings } from './itemSettings.js';
import { Member } from '@/member/member.js';

/**
 * This is an internal type do not use it !
 * @inner DiscriminatedItem
 */
export interface Item<S = ItemSettings> {
  id: string;
  name: string;
  description: string | null;
  path: string;
  settings: S;
  creator: Member | null;
  createdAt: string;
  updatedAt: string;
  lang: string;
}
