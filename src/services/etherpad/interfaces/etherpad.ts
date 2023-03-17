import { ItemType } from '../../../constants';
import { UnknownExtra } from '@/index';

/**
 * This type refers to the result sent by the server when querying
 * the /view or /read endpoints of the etherpad plugin API!
 */
export type Etherpad = {
  padUrl: string;
};

export type EtherpadItemExtraProperties = {
  padID: string;
  groupID: string;
};

export interface EtherpadItemExtra extends UnknownExtra {
  [ItemType.ETHERPAD]: EtherpadItemExtraProperties;
}
