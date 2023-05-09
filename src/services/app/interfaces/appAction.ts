import { Item, Member } from '@/services';

export type AppAction = {
  id: string
  item: Item;
  member: Member;
  type: string;
  data: object;
  createdAt: Date;
}
