import { Item } from '../baseItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';
import { UnionOfConst } from '@/typeUtils.js';

export type EtherpadItemType<S = ItemSettings> = {
  type: typeof ItemType.ETHERPAD;
  extra: EtherpadItemExtra;
} & Item<S>;

export const EtherpadReaderPermission = {
  Write: 'write',
  Read: 'read',
} as const;
export type EtherpadReaderPermissionType = UnionOfConst<
  typeof EtherpadReaderPermission
>;

/**
 * Etherpad Extra
 */
export type EtherpadItemExtraProperties = {
  padID: string;
  groupID: string;
  readerPermission?: EtherpadReaderPermissionType;
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
