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

export type ItemRecord =
  | ImmutableCast<AppItemType>
  | ImmutableCast<DocumentItemType>
  | ImmutableCast<FolderItemType>
  | ImmutableCast<H5PItemType>
  | ImmutableCast<EmbeddedLinkItemType>
  | ImmutableCast<LocalFileItemType>
  | ImmutableCast<S3FileItemType>
  | ImmutableCast<ShortcutItemType>
  | ImmutableCast<EtherpadItemType>;

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
