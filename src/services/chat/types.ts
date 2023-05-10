import { Item, Member } from '../index';
import { MentionStatus } from '@/constants/mentions';
import { UUID } from '@/types';

// ********************** Chat ******************************

export type ChatMessage = {
  id: UUID;
  item: Item;
  creator: Member | null;
  createdAt: Date;
  updatedAt: Date;
  body: string;
};

/**
 * All messages linked to an item
 */
export type ItemChat = {
  id: UUID;
  messages: ChatMessage[];
};

// type of the exported chat message
// contains the additional "creatorName" key with the plain text name of the user
export type ExportedChatMessage = {
  id: UUID;
  chatId: UUID;
  creator: Member;
  creatorName: string;
  createdAt: Date;
  updatedAt: Date;
  body: string;
};

export type ExportedItemChat = {
  id: UUID;
  messages: ExportedChatMessage[];
};

/**
 * Type of the "body" prop when sending a new message
 */
export type MessageBodyType = { body: string; mentions?: string[] };

export type PostChatMessageParamType = {
  itemId: ChatMessage['item']['id'];
} & MessageBodyType;

export type PatchChatMessageParamType = {
  messageId: ChatMessage['id'];
  itemId: ChatMessage['item']['id'];
} & MessageBodyType;

export type DeleteChatMessageParamType = {
  messageId: ChatMessage['id'];
  itemId: ChatMessage['item']['id'];
};

// ********************* Mentions *****************************

/**
 * type of a Mention from a Member in the chat
 */
export type ChatMention = {
  id: UUID;
  message: ChatMessage;
  member: Member;
  createdAt: Date;
  updatedAt: Date;
  status: MentionStatus;
};

/**
 * Represents all mentions destined to a member
 */
export type MemberMentions = {
  memberId: Member['id'];
  mentions: ChatMention[];
};

export enum ChatStatus {
  Open = 'true',
  Close = 'false',
}
