import { DiscriminatedItem, Member } from '@/services';
import { UUID } from '@/types';

export type AppSetting = {
  id: UUID;
  item: DiscriminatedItem;
  creator?: Member | null;
  name: string;
  data: { [key: string]: unknown };
  createdAt: Date;
  updatedAt: Date;
};
