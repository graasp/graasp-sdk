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

export enum PublicationStatus {
  /** Indicates that the item is not published. */
  Unpublished = 'unpublished',
  /** Indicates that the item is valid and published. */
  Published = 'published',
  /** Indicates that the item is published because it's a child of a published parent. */
  PublishedChildren = 'publishedChildren',
  /** Indicates that the item is valid and ready to be published. */
  ReadyToPublish = 'readyToPublish',
  /** Indicates that the item is currently subject to validation checks. */
  Pending = 'pending',
  /** Indicates that the item failed validation and cannot be published. */
  Invalid = 'invalid',
  /** Indicates that the item is published but the validation is outdated. */
  Outdated = 'outdated',
  /** Indicates that the item's type is not authorised for publication. */
  ItemTypeNotAllowed = 'itemTypeNotAllowed',
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
