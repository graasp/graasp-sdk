import { Item, Member } from '@/services';
import { UUID } from '@/types';

export type AppSetting = {
  id: UUID
  item: Item;
  creator: Member | null;
  name: string;
  data: { [key: string]: unknown };
  createdAt: Date;
  updatedAt: Date;
}
