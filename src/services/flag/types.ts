import { Item, Member } from '../index';
import { UUID } from '@/types';

export type ItemFlag = {
  id: UUID;
  type: `${FlagType}` | FlagType;
  item: Item;
  creator: Member;
  createdAt: Date;
};

export enum FlagType {
  InappropriateContent = 'inappropriate-content',
  HateSpeech = 'hate-speech',
  FraudPlagiarism = 'fraud-plagiarism',
  Spam = 'spam',
  TargetedHarassment = 'targeted-harassment',
  FalseInformation = 'false-information',
}
