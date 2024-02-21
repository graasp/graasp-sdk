import { DiscriminatedItem } from '@/item/item.js';
import { Member } from '@/member/member.js';
import { UUID } from '@/types.js';

export type ItemFlag = {
  id: UUID;
  type: `${FlagType}` | FlagType;
  item: DiscriminatedItem;
  creator: Member;
  createdAt: string;
};

export enum FlagType {
  InappropriateContent = 'inappropriate-content',
  HateSpeech = 'hate-speech',
  FraudPlagiarism = 'fraud-plagiarism',
  Spam = 'spam',
  TargetedHarassment = 'targeted-harassment',
  FalseInformation = 'false-information',
}
