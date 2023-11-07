import { DiscriminatedItem, Member } from '../index';
import { MentionStatus } from '@/constants/mentions';
import { UUID } from '@/types';

// ********************** Chat ******************************

export type ChatMessage = {
  id: UUID;
  item: DiscriminatedItem;
  creator: Member | null;
  createdAt: string;
  updatedAt: string;
  body: string;
};

// type of the exported chat message
// contains the additional "creatorName" key with the plain text name of the user
export type ExportedChatMessage = {
  id: UUID;
  chatId: UUID;
  creator: Member | null;
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
  createdAt: string;
  updatedAt: string;
  status: MentionStatus;
};

export enum ChatStatus {
  Open = 'true',
  Close = 'false',
}
