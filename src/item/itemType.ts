import { UnionOfConst } from '@/typeUtils.js';

export const ItemType = {
  APP: 'app',
  DOCUMENT: 'document',
  FOLDER: 'folder',
  LINK: 'embeddedLink',
  FILE: 'file',
  SHORTCUT: 'shortcut',
  H5P: 'h5p',
  ETHERPAD: 'etherpad',
  PAGE: 'page',
} as const;
export type ItemTypeUnion = UnionOfConst<typeof ItemType>;
