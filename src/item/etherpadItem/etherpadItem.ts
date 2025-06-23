import { Item } from '../baseItem.js';
import { ItemType } from '../itemType.js';
import { UnionOfConst } from '@/typeUtils.js';

export type EtherpadItemType<S = Item> = {
  type: typeof ItemType.ETHERPAD;
  extra: EtherpadItemExtra;
} & S;

export const EtherpadPermission = {
  Write: 'write',
  Read: 'read',
} as const;
export type EtherpadPermissionType = UnionOfConst<typeof EtherpadPermission>;

/**
 * Etherpad Extra
 */
export type EtherpadItemExtraProperties = {
  padID: string;
  groupID: string;
  readerPermission?: EtherpadPermissionType;
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
