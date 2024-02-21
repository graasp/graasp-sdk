import { ItemTypeUnion } from '@/item/itemType.js';

export const INDEX_NAME = 'itemIndex';

type IndexMember = {
  id: string;
  name: string;
};

export type IndexItem = {
  id: string;
  name: string;
  creator: IndexMember;
  description: string;
  type: ItemTypeUnion;
  categories: string[];
  content: string;
  isPublishedRoot: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
};

// TODO: get type from meilisearch library?
type Hits = IndexItem & {
  _formatted: IndexItem;
};
export type MeiliSearchResults = {
  results: {
    hits: Hits[];
    estimatedTotalHits: number;
    totalHits: number;
    totalPages: number;
    page: number;
  }[];
};
