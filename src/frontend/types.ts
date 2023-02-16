import type { List, RecordOf } from 'immutable';

import type {
  AppItemType,
  Category,
  CategoryType,
  ChatMention,
  ChatMessage,
  DocumentItemType,
  EmbeddedLinkItemType,
  Etherpad,
  EtherpadItemType,
  ExportedChatMessage,
  ExportedItemChat,
  Flag,
  FolderItemType,
  H5PItemType,
  Invitation,
  Item,
  ItemCategory,
  ItemChat,
  ItemLoginSchema,
  ItemMembership,
  ItemTag,
  LocalFileItemType,
  Member,
  MemberExtra,
  MemberMentions,
  S3FileItemType,
  ShortcutItemType,
} from '@/index';
import type { UUID } from '@/types';

/**
 * Convenience type to convert nested objects to deeply immutable objects
 */
export type ImmutableCast<Type> = RecordOf<{
  [Property in keyof Type]: Type[Property] extends (infer U)[] | undefined // check that type is an array (or an optional array)
    ? U extends object // check if internal array type is a custom type
      ? List<ImmutableCast<U>> // if is custom type transform to List of an immutable transformation of the custom type
      : List<U> // else just wrap in a List
    : Type[Property] extends object | undefined // check that type is a custom type (or optional custom type)
    ? ImmutableCast<Type[Property]> // if is custom type then transform to immutable custom type
    : Type[Property]; // else (it is a base type) just return the type
}>;

export type AppItemTypeRecord = ImmutableCast<AppItemType>;
export type DocumentItemTypeRecord = ImmutableCast<DocumentItemType>;
export type FolderItemTypeRecord = ImmutableCast<FolderItemType>;
export type H5PItemTypeRecord = ImmutableCast<H5PItemType>;
export type EmbeddedLinkItemTypeRecord = ImmutableCast<EmbeddedLinkItemType>;
export type LocalFileItemTypeRecord = ImmutableCast<LocalFileItemType>;
export type S3FileItemTypeRecord = ImmutableCast<S3FileItemType>;
export type ShortcutItemTypeRecord = ImmutableCast<ShortcutItemType>;
export type EtherpadItemTypeRecord = ImmutableCast<EtherpadItemType>;

export type ItemRecord =
  | AppItemTypeRecord
  | DocumentItemTypeRecord
  | FolderItemTypeRecord
  | H5PItemTypeRecord
  | EmbeddedLinkItemTypeRecord
  | LocalFileItemTypeRecord
  | S3FileItemTypeRecord
  | ShortcutItemTypeRecord
  | EtherpadItemTypeRecord;

export type EtherpadRecord = ImmutableCast<Etherpad>;

export type MemberExtraRecord = ImmutableCast<MemberExtra>;

export type MemberRecord = ImmutableCast<Member<MemberExtra>>;

export type ItemMembershipRecord = ImmutableCast<ItemMembership>;

export type ChatMentionRecord = ImmutableCast<ChatMention>;

export type MemberMentionsRecord = ImmutableCast<MemberMentions>;

/**
 * A `CategoryRecord` represents a sort of "tag" for an item. For example: "Math", "Kindergarten" etc ...
 */
export type CategoryRecord = ImmutableCast<Category>;

/**
 * A `CategoryTypeRecord` represents a higher order grouping of `CategoryRecord`s like "discipline", "education level" or "language"
 */
export type CategoryTypeRecord = ImmutableCast<CategoryType>;

export type ChatMessageRecord = ImmutableCast<ChatMessage>;

export type ItemChatRecord = ImmutableCast<ItemChat>;

export type ItemTagRecord = ImmutableCast<ItemTag>;

export type FlagRecord = ImmutableCast<Flag>;

export type InvitationRecord = ImmutableCast<Invitation>;

export type ItemCategoryRecord = ImmutableCast<ItemCategory>;

export type ItemLogin = {
  loginSchema: ItemLoginSchema;
};

export type ItemLoginRecord = ImmutableCast<ItemLogin>;

export type ExportedChatMessageRecord = ImmutableCast<ExportedChatMessage>;

export type ExportedItemChatRecord = ImmutableCast<ExportedItemChat>;

// a combined record from item-validation, item-validation-review, item-validation-process
export type FullValidation = {
  id: string;
  itemId: string;
  reviewStatusId: string;
  validationStatusId: string;
  validationResult: string;
  process: string;
  createdAt: string;
};

export type FullValidationRecord = ImmutableCast<FullValidation>;

export type ItemValidationAndReview = {
  itemValidationId: string;
  reviewStatusId: string;
  reviewReason: string;
  createdAt: string;
};

export type ItemValidationAndReviewRecord =
  ImmutableCast<ItemValidationAndReview>;

export type ItemValidationGroup = {
  id: string;
  itemId: string;
  itemValidationId: string;
  processId: string;
  statusId: string;
  result: string;
  updatedAt: string;
  createdAt: string;
};

export type ItemValidationGroupRecord = ImmutableCast<ItemValidationGroup>;

export type Status = {
  id: string;
  name: string;
};

export type StatusRecord = ImmutableCast<Status>;

export interface Action {
  id: string;
  itemId: UUID;
  memberId: UUID;
}
export type ActionRecord = ImmutableCast<Action>;

export type ActionMetadata = {
  numActionsRetrieved: number;
  requestedSampleSize: number;
};
export type ActionMetadataRecord = ImmutableCast<ActionMetadata>;

export interface ActionData {
  actions: Action[];
  descendants: Item[];
  item: Item;
  itemMemberships: ItemMembership[];
  members: Member[];
  metadata: ActionMetadata;
}
export type ActionDataRecord = ImmutableCast<ActionData>;

export type Password = string;
export type NewInvitation = Pick<Invitation, 'email' & 'permission'> &
  Partial<Invitation>;

export type ItemLike = {
  id: UUID;
  itemId: UUID;
  memberId: string;
  createdAt: string;
};

export type ItemLikeRecord = ImmutableCast<ItemLike>;

// todo: check exact value of extra prop
export type App = {
  name: string;
  url: string;
  description: string;
  extra: any;
};

export type AppRecord = ImmutableCast<App>;

export type Tag = {
  id: UUID;
  name: string;
};

export type TagRecord = ImmutableCast<Tag>;
