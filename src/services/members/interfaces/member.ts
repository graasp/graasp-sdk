import { EmailFrequency, UUID } from '@/index';

export enum MemberType {
  Individual = 'individual',
  Group = 'group',
}

export type MemberExtra = {
  hasAvatar?: boolean;
  lang?: string;
  enableSaveActions?: boolean;
  emailFreq?: `${EmailFrequency}` | EmailFrequency;
  hasCompletedTour?: boolean;
};

export type Member = {
  id: UUID;
  name: string;
  email: string;
};

export type CompleteMember = Member & {
  type: `${MemberType}` | MemberType;
  extra: MemberExtra;
  createdAt: Date;
  updatedAt: Date;
};
