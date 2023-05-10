import type { List, RecordOf } from 'immutable';

import type {
  Action,
  ActionData,
  App,
  AppItemType,
  Category,
  CategoryType,
  ChatMention,
  ChatMessage,
  DiscriminatedItem,
  DocumentItemType,
  EmbeddedLinkItemType,
  Etherpad,
  EtherpadItemType,
  ExportedChatMessage,
  ExportedItemChat,
  FolderItemType,
  H5PItemType,
  Invitation,
  ItemCategory,
  ItemFlag,
  ItemLike,
  ItemLogin,
  ItemLoginSchema,
  ItemMembership,
  ItemPublished,
  ItemTag,
  ItemValidationGroup,
  ItemValidationReview,
  LocalFileItemType,
  Member,
  MemberExtra,
  MemberMentions,
  RecycledItemData,
  S3FileItemType,
  ShortcutItemType,
} from '@/index';
import type { ResultOf } from '@/types';

/**
 * Convenience type to convert nested objects to deeply immutable objects
 */
export type ImmutableCast<Type> = Type extends (infer U)[]
  ? List<ImmutableCast<U>>
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Type extends RecordOf<infer V> | List<infer V> | Date // add any type that you do not want to change
  ? Type
  : Type extends object
  ? RecordOf<{
      [Property in keyof Type]: ImmutableCast<Type[Property]>;
    }>
  : Type;

export type AppItemTypeRecord = ImmutableCast<AppItemType>;
export type DocumentItemTypeRecord = ImmutableCast<DocumentItemType>;
export type FolderItemTypeRecord = ImmutableCast<FolderItemType>;
export type H5PItemTypeRecord = ImmutableCast<H5PItemType>;
export type EmbeddedLinkItemTypeRecord = ImmutableCast<EmbeddedLinkItemType>;
export type LocalFileItemTypeRecord = ImmutableCast<LocalFileItemType>;
export type S3FileItemTypeRecord = ImmutableCast<S3FileItemType>;
export type ShortcutItemTypeRecord = ImmutableCast<ShortcutItemType>;
export type EtherpadItemTypeRecord = ImmutableCast<EtherpadItemType>;

export type ItemRecord = ImmutableCast<DiscriminatedItem>;

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

export type ItemChatRecord = ImmutableCast<ChatMessage[]>;

export type ItemTagRecord = ImmutableCast<ItemTag>;

export type ItemFlagRecord = ImmutableCast<ItemFlag>;

export type InvitationRecord = ImmutableCast<Invitation>;

export type ItemCategoryRecord = ImmutableCast<ItemCategory>;

export type ItemLoginRecord = ImmutableCast<ItemLogin>;

export type ItemLoginSchemaRecord = ImmutableCast<ItemLoginSchema>;

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
  createdAt: Date;
};

export type FullValidationRecord = ImmutableCast<FullValidation>;

export type ItemValidationAndReviewRecord = ImmutableCast<ItemValidationReview>;

export type ItemValidationGroupRecord = ImmutableCast<ItemValidationGroup>;

export type ActionRecord = ImmutableCast<Action>;

export type ActionDataRecord = ImmutableCast<ActionData>;

export type Password = string;
export type NewInvitation = Pick<Invitation, 'email' & 'permission'> &
  Partial<Invitation>;

export type ItemLikeRecord = ImmutableCast<ItemLike>;

export type AppRecord = ImmutableCast<App>;

export type ResultOfRecord<T> = ImmutableCast<ResultOf<T>>;

export type ItemPublishedRecord = ImmutableCast<ItemPublished>;

export type RecycledItemDataRecord = ImmutableCast<RecycledItemData>;
