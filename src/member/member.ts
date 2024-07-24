import { PSEUDO_USER_MAIL_REGEX } from './constants.js';
import { EmailFrequency } from '@/chat/mentions.js';
import { UUID } from '@/types.js';

export type Password = string;

export type MemberStorage = {
  current: number;
  maximum: number;
};

export type MemberStorageItem = {
  id: UUID;
  name: string;
  size: number;
  updatedAt: string;
  path: string;
  parent?: {
    id: UUID;
    name: string;
  };
};

export type Pagination = {
  totalCounts: number;
  page: number;
  pageSize: number;
};

export type MemberStorageItemsResponse = {
  data: MemberStorageItem[];
  pagination: Pagination;
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

export type Member = {
  id: UUID;
  name: string;
  email: string;
};

export type CompleteMember = Member & {
  type: `${MemberType}` | MemberType;
  extra: MemberExtra;
  enableSaveActions: boolean;
  userAgreementsDate?: string;
  createdAt: string;
  updatedAt: string;
  lastAuthenticatedAt?: string;
  isValidated: boolean;
};

export const isPseudoMember = (member: { email: string }) =>
  PSEUDO_USER_MAIL_REGEX.test(member.email.toLowerCase());
