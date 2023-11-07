import { DiscriminatedItem, Member } from '@/services';

export enum AppDataVisibility {
  Item = 'item',
  Member = 'member',
}

type Data = { [key: string]: unknown };

export type AppData<T extends Data = Data> = {
  id: string;
  item: DiscriminatedItem;
  creator: Member | null;
  member: Member;
  type: string;
  visibility: `${AppDataVisibility}` | AppDataVisibility;
  data: T;
  createdAt: string;
  updatedAt: string;
};
