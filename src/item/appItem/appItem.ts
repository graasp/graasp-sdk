import { Item } from '../baseItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';

export type AppItemType<S = ItemSettings> = {
  type: typeof ItemType.APP;
  extra: AppItemExtra;
} & Item<S>;

/**
 * App Extra
 */
export type AppItemExtraProperties = {
  url: string;
};
export type AppItemExtra = {
  [ItemType.APP]: AppItemExtraProperties;
};

export const getAppExtra = <U extends AppItemExtra>(
  extra: U,
): U[typeof ItemType.APP] => extra[ItemType.APP];

export const buildAppExtra = ({
  url,
}: AppItemExtraProperties): AppItemExtra => ({
  [ItemType.APP]: { url },
});

/**
 * App Setting
 */
