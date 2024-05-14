export enum ChatbotRole {
  System = 'system',
  Assistant = 'assistant',
  User = 'user',
}

export enum GPTVersion {
  /**
   * Default GPT model used. Has a 16K context window.
   * Costs the least of all models with ok precision and speed
   */
  GPT_3_5_TURBO = 'gpt-3.5-turbo-0125',
  /**
   * First generation GPT 4 model. Has an 8K token context window.
   * Costs a lot and is not very fast.
   */
  GPT_4 = 'gpt-4',
  /**
   * Fast version of GPT 4. Has 128K token context window.
   * Costs less than GPT 4 but more thn 3.5-turbo.
   * Best for real time conversations.
   */
  GPT_4_TURBO = 'gpt-4-turbo',
  /**
   * New and improved version of GPT 4. Has a 128K token context window.
   * Has better capabilities than GPT 4 for a 6th of the price.
   */
  GPT_4_O = 'gpt-4o',
}

export type ChatBotMessage = {
  role: `${ChatbotRole}` | ChatbotRole;
  content: string;
};
