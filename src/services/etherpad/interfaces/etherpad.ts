import { ItemType } from '../../../constants';
import { UnknownExtra } from '@/index';

export type Etherpad = {
  padUrl: string;
};

export interface EtherpadItemExtra extends UnknownExtra {
  [ItemType.ETHERPAD]: Etherpad;
}
