import { ItemType } from '@/constants';

export const INDEX_NAME = 'itemIndex';

export type IndexItem = {
  id: string;
  name: string;
  creator: IndexMember;
  description: string;
  type: `${ItemType}`;
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
