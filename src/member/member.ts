import { PSEUDO_USER_MAIL_REGEX } from './constants.js';
import { EmailFrequency } from '@/chat/mentions.js';
import { UUID } from '@/types.js';

export type Password = string;

export type MemberStorage = {
  current: number;
  maximum: number;
};

export enum MemberType {
  Individual = 'individual',
  Group = 'group',
}

type MemberExtra = {
  hasAvatar?: boolean;
  lang?: string;
  enableSaveActions?: boolean;
  emailFreq?: `${EmailFrequency}` | EmailFrequency;
  hasCompletedTour?: boolean;
};

export const buildMemberExtra = (extra: Partial<MemberExtra>) => ({
  hasAvatar: false,
  enableSaveActions: true,
  emailFreq: EmailFrequency.Always,
  hasCompletedTour: false,
  ...extra,
});

export type Member = {
  id: UUID;
  name: string;
  email: string;
};

export type CompleteMember = Member & {
  type: `${MemberType}` | MemberType;
  extra: MemberExtra;
  createdAt: string;
  updatedAt: string;
};

export const isPseudoMember = (member: { email: string }) =>
  PSEUDO_USER_MAIL_REGEX.test(member.email.toLowerCase());
