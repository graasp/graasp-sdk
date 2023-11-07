import { DiscriminatedItem, Member } from '@/services';
import { UUID } from '@/types';

type Data = { [key: string]: unknown };
export type AppSetting<T extends Data = Data> = {
  id: UUID;
  item: DiscriminatedItem;
  creator?: Member | null;
  name: string;
  data: T;
  createdAt: string;
  updatedAt: string;
};
