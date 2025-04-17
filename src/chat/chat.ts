import { Account } from '../member/member.js';
import { UUID } from '../types.js';
import { MentionStatus } from './mentions.js';

export type ChatMessage = {
  id: UUID;
  itemId: string;
  creatorId: string | null;
  createdAt: string;
  updatedAt: string;
  body: string;
};

export type ChatMessageWithCreator = ChatMessage & {
  creator: Account;
};

// type of the exported chat message
// contains the additional "creatorName" key with the plain text name of the user
export type ExportedChatMessage = {
  id: UUID;
  chatId: UUID;
  creator: Account | null;
  creatorName: string;
  createdAt: string;
  updatedAt: string;
  body: string;
};

/**
 * Type of the "body" prop when sending a new message
 */
export type MessageBodyType = { body: string; mentions?: string[] };

export type PostChatMessageParamType = {
  itemId: ChatMessage['itemId'];
} & MessageBodyType;

export type PatchChatMessageParamType = {
  messageId: ChatMessage['id'];
  itemId: ChatMessage['itemId'];
} & MessageBodyType;

export type DeleteChatMessageParamType = {
  messageId: ChatMessage['id'];
  itemId: ChatMessage['itemId'];
};

// ********************* Mentions *****************************

/**
 * type of a Mention from a Member in the chat
 */
export type ChatMention = {
  id: UUID;
  message: ChatMessage;
  account: Account;
  createdAt: string;
  updatedAt: string;
  status: MentionStatus;
};

export enum ChatStatus {
  Open = 'true',
  Close = 'false',
}
