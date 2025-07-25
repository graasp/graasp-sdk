import { UnionOfConst } from '@/typeUtils.js';

export const GPTVersion = {
  /**
   * @deprecated
   * Default GPT model used. Has a 16K context window.
   * Costs the least of all models with ok precision and speed
   */
  GPT_3_5_TURBO: 'gpt-3.5-turbo-0125',
  /**
   * @deprecated
   * Fast version of GPT 4. Has 128K token context window.
   * Costs less than GPT 4 but more thn 3.5-turbo.
   * Best for real time conversations.
   */
  GPT_4_TURBO: 'gpt-4-turbo',
  /**
   * @deprecated
   * New and improved version of GPT 4. Has a 128K token context window.
   * Has better capabilities than GPT 4 for a 6th of the price.
   */
  GPT_4_O: 'gpt-4o',
  /**
   * Fast and affordable small model for focused tasks
   * 128k context window
   */
  GPT_4_O_MINI: 'gpt-4o-mini',
  /**
   * Fastest, most cost effective GPT 4.1 model
   * 1M context window
   */
  GPT_4_1_NANO: 'gpt-4.1-nano',
} as const;

export type GPTVersionType = UnionOfConst<typeof GPTVersion>;

/**
 * Use this array in your app to warn users about deprecated models.
 * These will be removed in the future and alternatives should be used.
 */
export const DEPRECATED_GPT_MODELS = [
  GPTVersion.GPT_3_5_TURBO,
  GPTVersion.GPT_4_TURBO,
  GPTVersion.GPT_4_O,
];

export const ChatbotRole = {
  System: 'system',
  Assistant: 'assistant',
  User: 'user',
} as const;
export type ChatbotRoleType = UnionOfConst<typeof ChatbotRole>;

export type ChatBotMessage = {
  role: ChatbotRoleType;
  content: string;
};
