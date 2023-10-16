export enum ChatbotRole {
  System = 'system',
  Assistant = 'assistant',
  User = 'user',
}

export interface ChatBotMessage {
  role: `${ChatbotRole}` | ChatbotRole;
  content: string;
}
