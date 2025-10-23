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
  bio: string;
  facebookId: string;
  linkedinId: string;
  twitterId: string;
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
};

export enum AccountType {
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

/**
 * @deprecated Use CurrentAccount instead
 */
export type Member = Account & {
  email: string;
};

export type CompleteAccount = Account & {
  type: `${AccountType}` | AccountType;
  createdAt: string;
  updatedAt: string;
  lastAuthenticatedAt: string | null;
  lang: string;
};

export type CompleteMember = CompleteAccount & {
  type: AccountType.Individual;
  email: string;
  extra: MemberExtra;
  enableSaveActions: boolean;
  userAgreementsDate: string | null;
  lang: string;

  isValidated: boolean;
};

export type CompleteGuest = CompleteAccount & {
  type: AccountType.Guest;
  lang: string;
  itemLoginSchema: ItemLoginSchema;
};

export type CurrentAccount = CompleteMember | CompleteGuest;

export function isPseudoMember(member: { type: AccountType }) {
  return member.type === AccountType.Guest;
}

type SomeAccount =
  | { type: AccountType.Individual; extra: MemberExtra }
  | { type: Exclude<`${AccountType}`, `${AccountType.Individual}`> };
/**
 * A utils function to get the current member language
 * Return the member lang or the default passed language if not found.
 * In case the member is not defined, return `undefined`
 * @param account an object that has a type property and an optional extra property when the type is 'individual'
 * @param defaultValue then default language to use when the user does not have one set
 * @returns a string that represents the language of the member
 */
export const getCurrentAccountLang = <
  T extends SomeAccount | undefined | null,
  R = T extends SomeAccount ? string : undefined,
>(
  account: T,
  defaultValue: string,
): R => {
  if (account) {
    if (account.type === AccountType.Individual) {
      return (account.extra.lang ?? defaultValue) as R;
    }
    return defaultValue as R;
  }
  return undefined as R;
};
