import { Item, Member } from '@/services';

export enum AppDataVisibility {
  Item = 'item',
  Member = 'member',
}

export type AppData = {
  id: string;
  item: Item;
  creator: Member | null;
  member: Member;
  type: string;
  visibility: AppDataVisibility;
  data: { [key: string]: unknown };
  createdAt: Date;
  updatedAt: Date;
};
