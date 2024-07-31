import { EmailFrequency } from '@/chat/mentions.js';
import { ItemLoginSchema } from '@/itemLogin/itemLogin.js';
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

export type Account = {
  id: UUID;
  name: string;
};

type AccountTypeProperty = {
  type: `${MemberType}` | MemberType;
};

export type Member = Account & {
  email: string;
};

export type Guest = Account;

export type AugmentedAccount =
  | (Member & {
      type: MemberType.Individual;
    })
  | (Guest & {
      type: MemberType.Guest;
    });

export type BaseAccount = Account &
  AccountTypeProperty & {
    createdAt: string;
    updatedAt: string;
    lastAuthenticatedAt?: string;
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

export type CompleteAccount = CompleteMember | CompleteGuest;

export function isPseudoMember(member: { type: MemberType }) {
  return member.type === MemberType.Guest;
}
