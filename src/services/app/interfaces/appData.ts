import { DiscriminatedItem, Item, Member } from '@/services';

export enum AppDataVisibility {
  Item = 'item',
  Member = 'member',
}

export type AppData = {
  id: string;
  item: DiscriminatedItem;
  creator: Member | null;
  member: Member;
  type: string;
  visibility: `${AppDataVisibility}` | AppDataVisibility;
  data: { [key: string]: unknown };
  createdAt: Date;
  updatedAt: Date;
};
