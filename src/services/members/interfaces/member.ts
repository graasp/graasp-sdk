import { EmailFrequency, UUID } from '@/index';

export enum MemberType {
  Individual = 'individual',
  Group = 'group',
}

export interface MemberExtra {
  hasAvatar?: boolean;
  lang?: string;
  enableSaveActions?: boolean;
  emailFreq?: `${EmailFrequency}` | EmailFrequency;
  hasCompletedTour?: boolean;
}

export interface Member {
  id: UUID;
  name: string;
  email: string;
}

export interface CompleteMember {
  id: UUID;
  name: string;
  email: string;
  type: `${MemberType}` | MemberType;
  extra: MemberExtra;
  createdAt: Date;
  updatedAt: Date;
}
