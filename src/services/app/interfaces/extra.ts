import { ItemType } from '../../../constants';
import { UnknownExtra } from '../../../interfaces';

export type AppItemExtraProperties = {
  url: string;
  settings: UnknownExtra;
};

export interface AppItemExtra extends UnknownExtra {
  [ItemType.APP]: AppItemExtraProperties;
}
