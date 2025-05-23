import { ItemTypeUnion } from '@/item/itemType.js';
import { TagCategoryType } from '@/tag/tag.js';

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
  publicationUpdatedAt: string;
  lang: string;
  likes: number;
} & { [key in TagCategoryType]: string[] };

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
