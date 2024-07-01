import { PSEUDO_USER_MAIL_REGEX } from './constants.js';
import { EmailFrequency } from '@/chat/mentions.js';
import { ItemLoginSchema } from '@/itemLogin/itemLogin.js';
import { UUID } from '@/types.js';

export type Password = string;

export type MemberStorage = {
  current: number;
  maximum: number;
};

export type PublicProfile = {
  id: UUID;
  member: Member;
  bio: string;
  facebookID: string;
  linkedinID: string;
  twitterID: string;
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
};

export enum MemberType {
  Individual = 'individual',
  Group = 'group',
  Guest = 'guest',
}

type MemberExtra = {
  hasAvatar?: boolean;
  lang?: string;
  emailFreq?: `${EmailFrequency}` | EmailFrequency;
  hasCompletedTour?: boolean;
};

export const buildMemberExtra = (extra: Partial<MemberExtra>) => ({
  hasAvatar: false,
  emailFreq: EmailFrequency.Always,
  hasCompletedTour: false,
  ...extra,
});

export type BaseAccount = {
  id: UUID;
  name: string;
  type: `${MemberType}` | MemberType;
  createdAt: string;
  updatedAt: string;
  lastAuthenticatedAt?: string;
};

export type CompleteAccount = CompleteMember | CompleteGuest;

export type Member = {
  id: UUID;
  name: string;
};
export type CompleteMember = BaseAccount & {
  type: MemberType.Individual;
  email: string;
  extra: MemberExtra;
  enableSaveActions: boolean;
  userAgreementsDate?: string;

  isValidated: boolean;
};
export type CompleteGuest = BaseAccount & {
  type: MemberType.Guest;
  itemLoginSchema: ItemLoginSchema;
};

export const isPseudoMember = (member: { email: string }) =>
  PSEUDO_USER_MAIL_REGEX.test(member.email.toLowerCase());
