import { DiscriminatedItem, Member } from '@/services';

export type AppAction = {
  id: string;
  item: DiscriminatedItem;
  member: Member;
  type: string;
  data: object;
  createdAt: Date;
};
