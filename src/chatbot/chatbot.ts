import { UnionOfConst } from '@/typeUtils.js';

export const ChatbotRole = {
  System: 'system',
  Assistant: 'assistant',
  User: 'user',
} as const;
export type ChatbotRoleType = UnionOfConst<typeof ChatbotRole>;

export enum GPTVersion {
  /**
   * Fast and affordable small model for focused tasks
   * 128k context window
   */
  GPT_4_O_MINI = 'gpt-4o-mini',
  /**
   * Fastest, most cost effective GPT 4.1 model
   * 1M context window
   */
  GPT_4_1_NANO = 'gpt-4.1-nano',
}

export type ChatBotMessage = {
  role: ChatbotRoleType;
  content: string;
};
