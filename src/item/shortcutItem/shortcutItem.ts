import { Item } from '../baseItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';

export type ShortcutItemType<S = ItemSettings> = {
  type: typeof ItemType.SHORTCUT;
  extra: ShortcutItemExtra;
} & Item<S>;

/**
 * Shortcut Extra
 */
export type ShortcutItemExtraProperties = {
  target: string;
};
export interface ShortcutItemExtra {
  [ItemType.SHORTCUT]: ShortcutItemExtraProperties;
}

export const getShortcutExtra = <U extends ShortcutItemExtra>(
  extra: U,
): U[typeof ItemType.SHORTCUT] => extra[ItemType.SHORTCUT];

export const buildShortcutExtra = (target: string): ShortcutItemExtra => ({
  [ItemType.SHORTCUT]: { target },
});
