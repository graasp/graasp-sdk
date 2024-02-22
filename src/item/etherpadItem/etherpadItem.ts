import { Item } from '../baseItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';

export type EtherpadItemType<S = ItemSettings> = {
  type: typeof ItemType.ETHERPAD;
  extra: EtherpadItemExtra;
} & Item<S>;

/**
 * Etherpad Extra
 */
export type EtherpadItemExtraProperties = {
  padID: string;
  groupID: string;
};
export interface EtherpadItemExtra {
  [ItemType.ETHERPAD]: EtherpadItemExtraProperties;
}

export const getEtherpadExtra = <U extends EtherpadItemExtra>(
  extra: U,
): U[typeof ItemType.ETHERPAD] => extra[ItemType.ETHERPAD];

export const buildEtherpadExtra = (
  extra: EtherpadItemExtraProperties,
): EtherpadItemExtra => ({
  [ItemType.ETHERPAD]: extra,
});
