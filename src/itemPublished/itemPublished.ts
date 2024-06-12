import {
  DiscriminatedItem,
  ItemType,
  ItemTypeUnion,
  Member,
  PackedItem,
} from '../index.js';
import { UUID } from '@/types.js';

export interface ItemPublished {
  id: UUID;
  creator?: Member;
  createdAt: string;
  item: DiscriminatedItem;
  totalViews: number;
}

export interface PackedItemPublished {
  id: UUID;
  creator?: Member;
  createdAt: string;
  item: PackedItem;
  totalViews: number;
}

export class PublishableItemTypeChecker {
  private static readonly ALLOWED_PUBLISHING_TYPES: ItemTypeUnion[] = [
    ItemType.FOLDER,
  ];

  public static isItemTypeAllowedToBePublished(itemType: ItemTypeUnion) {
    return PublishableItemTypeChecker.ALLOWED_PUBLISHING_TYPES.includes(
      itemType,
    );
  }

  public static getAllowedTypes() {
    return Array.from(PublishableItemTypeChecker.ALLOWED_PUBLISHING_TYPES);
  }
}
