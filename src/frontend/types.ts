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
  : RecordOf<{
      [Property in keyof Type]: Type[Property] extends (infer U)[] | undefined // check that type is an array (or an optional array)
        ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Type[Property] extends RecordOf<infer V> | List<infer V>
          ? Type[Property]
          : U extends object // check if internal array type is a custom type
          ? List<ImmutableCast<U>> // if is custom type transform to List of an immutable transformation of the custom type
          : List<U> // else just wrap in a List
        : Type[Property] extends Date // check that type is a date
        ? Type[Property] // return raw date
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
