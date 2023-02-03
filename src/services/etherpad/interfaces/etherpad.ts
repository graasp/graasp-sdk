import { ItemType } from '../../../constants';

export interface Etherpad {
  padUrl: string;
}
export type EtherpadItemExtra = {
  [ItemType.ETHERPAD]: Etherpad;
};
