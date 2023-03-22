import { ItemType } from '../../../constants';
import { UnknownExtra } from '../../../interfaces';

export type AppItemExtraProperties = {
  url: string;
  settings?: UnknownExtra;
};

export type AppItemExtra = {
  [ItemType.APP]: AppItemExtraProperties;
};
