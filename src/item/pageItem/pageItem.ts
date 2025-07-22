import { Item } from '../baseItem.js';
import { ItemSettings } from '../itemSettings.js';
import { ItemType } from '../itemType.js';

export type PageItemType<S = ItemSettings> = {
  type: typeof ItemType.PAGE;
  extra: never;
  settings: ItemSettings;
} & Item<S>;
