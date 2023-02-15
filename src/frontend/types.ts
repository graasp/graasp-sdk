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

export type EtherpadRecord = RecordOf<Etherpad>;

export type MemberExtraRecord = ImmutableCast<MemberExtra>;

export type MemberRecord = ImmutableCast<Member<MemberExtra>>;

export type ItemMembershipRecord = ImmutableCast<ItemMembership>;

export type ChatMentionRecord = ImmutableCast<ChatMention>;

export type MemberMentionsRecord = ImmutableCast<MemberMentions>;

/**
 * A `CategoryRecord` represents a sort of "tag" for an item. For example: "Math", "Kindergarten" etc ...
 */
export type CategoryRecord = RecordOf<Category>;

/**
 * A `CategoryTypeRecord` represents a higher order grouping of `CategoryRecord`s like "discipline", "education level" or "language"
 */
export type CategoryTypeRecord = RecordOf<CategoryType>;

export type ChatMessageRecord = ImmutableCast<ChatMessage>;

export type ItemChatRecord = ImmutableCast<ItemChat>;

export type ItemTagRecord = RecordOf<ItemTag>;

export type FlagRecord = RecordOf<Flag>;

export type InvitationRecord = RecordOf<Invitation>;

export type ItemCategoryRecord = RecordOf<ItemCategory>;

export type ItemLogin = {
  loginSchema: ItemLoginSchema;
};

export type ItemLoginRecord = RecordOf<ItemLogin>;

export type ExportedChatMessageRecord = RecordOf<ExportedChatMessage>;

export type ExportedItemChatRecord = ImmutableCast<ExportedItemChat>;

// a combined record from item-validation, item-validation-review, item-validation-process
export type FullValidationRecord = {
  id: string;
  itemId: string;
  reviewStatusId: string;
  validationStatusId: string;
  validationResult: string;
  process: string;
  createdAt: string;
};

export type FullValidationRecordRecord = RecordOf<FullValidationRecord>;

export type ItemValidationAndReview = {
  itemValidationId: string;
  reviewStatusId: string;
  reviewReason: string;
  createdAt: string;
};

export type ItemValidationAndReviewRecord = RecordOf<ItemValidationAndReview>;

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

export type ItemValidationGroupRecord = RecordOf<ItemValidationGroup>;

export type Status = {
  id: string;
  name: string;
};

export type StatusRecord = RecordOf<Status>;

export interface Action {
  id: string;
  itemId: UUID;
  memberId: UUID;
}

export type ActionRecord = RecordOf<Action>;
export type ActionMetadata = {
  numActionsRetrieved: number;
  requestedSampleSize: number;
};
export type ActionMetadataRecord = RecordOf<{
  numActionsRetrieved: number;
  requestedSampleSize: number;
}>;

export interface ActionData {
  actions: List<ActionRecord>;
  descendants: List<ItemRecord>;
  item: ItemRecord;
  itemMemberships: List<ItemMembershipRecord>;
  members: List<MemberRecord>;
  metadata: ActionMetadataRecord;
}

export type ActionDataRecord = RecordOf<ActionData>;

export type Password = string;
export type NewInvitation = Pick<Invitation, 'email' & 'permission'> &
  Partial<Invitation>;

export type ItemLike = {
  id: UUID;
  itemId: UUID;
  memberId: string;
  createdAt: string;
};

export type ItemLikeRecord = RecordOf<ItemLike>;

export type App = {
  name: string;
  url: string;
  description: string;
  extra: any;
};

export type AppRecord = RecordOf<App>;

export type Tag = {
  id: UUID;
  name: string;
};

export type TagRecord = RecordOf<Tag>;
