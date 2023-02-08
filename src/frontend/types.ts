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
  S3FileItemType,
  ShortcutItemType,
} from 'src/index';

/**
 * Convenience type to convert nested objects to deeply immutable objects
 */
export type ImmutableCast<Type> = RecordOf<{
  [Property in keyof Type]: Type[Property] extends (infer U)[]
    ? List<U>
    : Type[Property] extends (infer U)[] | undefined
    ? List<U> | undefined
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

export type PartialNewChatMessage = {
  chatId: string;
  body: MessageBodyType;
};

export type PartialChatMessage = {
  chatId: string;
  messageId: string;
  body?: MessageBodyType;
};

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
