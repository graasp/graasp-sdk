import { Item, Member } from '../index';
import { UUID } from '@/types';

export type ItemFlag = {
  id: UUID;
  type: FlagType;
  item: Item;
  creator: Member;
  createdAt: Date;
};

export enum FlagType {
  INAPPROPRIATE_CONTENT = 'inappropriate-content',
  HATE_SPEECH = 'hate-speech',
  FRAUD_PLAGIARISM = 'fraud-plagiarism',
  SPAM = 'spam',
  TARGETED_HARASMENT = 'targeted-harrasment',
  FALSE_INFORMATION = 'false-information',
}
