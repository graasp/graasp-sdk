import { List, RecordOf } from 'immutable';
import {
  AppItemType,
  DocumentItemType,
  EmbeddedLinkItemType,
  Etherpad,
  EtherpadItemType,
  FolderItemType,
  H5PItemType,
  ItemMembership,
  LocalFileItemType,
  Member,
  MemberExtra,
  MentionStatus,
  PermissionLevel,
  S3FileItemType,
  ShortcutItemType,
} from 'src/index';

// alias type for uuid v4
type UUID = string;

/**
 * Convenience type to convert nested objects to deeply immutable objects
 */
export type ImmutableCast<Type> = RecordOf<{
  [Property in keyof Type]: Type[Property] extends (infer U)[]
    ? U extends object
      ? List<ImmutableCast<U>>
      : List<U>
    : Type[Property] extends (infer U)[] | undefined
    ? U extends object
      ? List<ImmutableCast<U>> | undefined
      : List<U> | undefined
    : Type[Property] extends object
    ? ImmutableCast<Type[Property]>
    : Type[Property];
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

export type ChatMention = {
  id: string;
  itemPath: string;
  message: string;
  messageId: string;
  memberId: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  status: MentionStatus;
};

export type ChatMentionRecord = ImmutableCast<ChatMention>;

export type PartialChatMention = {
  id: string;
  status: MentionStatus;
};

export type MemberMentions = {
  memberId: string;
  mentions: ChatMention[];
};

export type MemberMentionsRecord = ImmutableCast<MemberMentions>;

export type MessageBodyType = { message: string; mentions?: string[] };

export type Category = {
  id: UUID;
  name: string;
  type: UUID;
};

export type CategoryRecord = RecordOf<Category>;

// todo: Do we use this or the one with the `type` prop ??
export type CategoryType = {
  id: UUID;
  name: string;
};

export type CategoryTypeRecord = RecordOf<CategoryType>;

export type ChatMessage = {
  id: string;
  chatId: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  body: string;
};

export type ChatMessageRecord = ImmutableCast<ChatMessage>;

export type ItemChat = {
  id: string;
  messages: ChatMessage[];
};

export type ItemChatRecord = ImmutableCast<ItemChat>;

export type ItemTag = {
  id: UUID;
  itemPath: string;
  tagId: UUID;
  createdAt: string;
  creator: string;
};

export type ItemTagRecord = RecordOf<ItemTag>;

export type Flag = {
  id: UUID;
  name: string;
};

export type FlagRecord = RecordOf<Flag>;

export type Invitation = {
  id: UUID;
  email: string;
  permission?: PermissionLevel;
  name?: string;
  creator: UUID;
  itemPath: string;
};

export type InvitationRecord = RecordOf<Invitation>;

export type ItemCategory = {
  id: UUID;
  itemId: UUID;
  categoryId: UUID;
  createdAt: string;
  creator: string;
};

export type ItemCategoryRecord = RecordOf<ItemCategory>;

export enum ITEM_LOGIN_SCHEMAS {
  USERNAME = 'username',
  USERNAME_AND_PASSWORD = 'username+password',
}

export type ItemLogin = {
  loginSchema: ITEM_LOGIN_SCHEMAS;
};

export type ItemLoginRecord = RecordOf<ItemLogin>;

// type of the exported chat message
// contains the additional "creatorName" key with the plain text name of the user
export type ExportedChatMessage = {
  id: string;
  chatId: string;
  creator: string;
  creatorName: string;
  createdAt: string;
  updatedAt: string;
  body: string;
};

export type ExportedChatMessageRecord = RecordOf<ExportedChatMessage>;

export type ExportedItemChat = {
  id: string;
  messages: List<ExportedChatMessageRecord>;
};

export type ExportedItemChatRecord = RecordOf<ExportedItemChat>;

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
