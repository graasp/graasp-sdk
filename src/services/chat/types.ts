import { MentionStatus } from '@/constants/mentions';

// ********************** Chat ******************************

export type ChatMessage = {
  id: string;
  chatId: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  body: string;
};

/**
 * All messages linked to an item
 */
export type ItemChat = {
  id: string;
  messages: ChatMessage[];
};

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

export type ExportedItemChat = {
  id: string;
  messages: ExportedChatMessage[];
};

/**
 * Type of the "body" prop when sending a new message
 */
export type MessageBodyType = { message: string; mentions?: string[] };

// ********************* Mentions *****************************

/**
 * type of a Mention from a Member in the chat
 */
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

export type PartialChatMention = Pick<ChatMention, 'id' | 'status'>;

/**
 * Represents all mentions destined to a member
 */
export type MemberMentions = {
  memberId: string;
  mentions: ChatMention[];
};
