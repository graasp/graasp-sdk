import { ItemType } from '@/constants';
import { UnionOfConst } from '@/types';

export const INDEX_NAME = 'itemIndex';

export type IndexItem = {
  id: string;
  name: string;
  creator: IndexMember;
  description: string;
  type: UnionOfConst<typeof ItemType>;
  categories: string[];
  content: string;
  isPublishedRoot: boolean;
  isHidden: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type IndexMember = {
  id: string;
  name: string;
};

// todo: get type from meilisearch library?
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
