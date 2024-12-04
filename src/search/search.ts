import { ItemTypeUnion } from '@/item/itemType.js';
import { TagCategory } from '@/tag/tag.js';

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
  content: string;
  isPublishedRoot: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
  lang: string;
} & { [key in TagCategory]: string[] };

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
