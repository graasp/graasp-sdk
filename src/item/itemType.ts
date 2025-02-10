import { UnionOfConst } from '@/typeUtils.js';

export const ItemType = {
  APP: 'app',
  DOCUMENT: 'document',
  FOLDER: 'folder',
  LINK: 'embeddedLink',
  /**
   * @deprecated use ItemType.FILE
   */
  LOCAL_FILE: 'file',
  FILE: 'file',
  SHORTCUT: 'shortcut',
  H5P: 'h5p',
  ETHERPAD: 'etherpad',
} as const;
export type ItemTypeUnion = UnionOfConst<typeof ItemType>;
