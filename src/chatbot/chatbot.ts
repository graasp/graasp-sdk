export enum ChatbotRole {
  System = 'system',
  Assistant = 'assistant',
  User = 'user',
}

export type ChatBotMessage = {
  role: `${ChatbotRole}` | ChatbotRole;
  content: string;
};
