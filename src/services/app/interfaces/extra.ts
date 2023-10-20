import { ItemType } from '../../../constants';

export type AppItemExtraProperties = {
  url: string;
  // todo: there currently is nothing stored in the settings. this might change later
  settings?: unknown;
};

export interface AppItemExtra {
  [ItemType.APP]: AppItemExtraProperties;
}
