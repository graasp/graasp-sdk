import { Serializable, UnknownExtra } from '../../../interfaces/extra';

export interface Item<T extends UnknownExtra = UnknownExtra> {
  id: string;
  name: string;
  description: string;
  type: string;
  path: string;
  extra: T;
  settings: ItemSettings;
  creator: string;
  createdAt: string;
  updatedAt: string;
}
export interface ItemSettings extends Serializable {
  isPinned?: boolean;
  showChatBox?: boolean;
  hasThumbnail?: boolean;
}
