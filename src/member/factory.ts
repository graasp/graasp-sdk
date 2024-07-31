import {
  Account,
  AccountType,
  CompleteAccount,
  CompleteGuest,
  CompleteMember,
} from './member.js';
import { faker } from '@faker-js/faker';

export function AccountFactory(account: Partial<Account> = {}): Account {
  return { id: faker.string.uuid(), name: faker.person.fullName(), ...account };
}

function BaseAccountFactory<T extends AccountType>(
  baseAccount: Partial<CompleteAccount> & { type: T },
): CompleteAccount & { type: T } {
  return {
    ...AccountFactory(baseAccount),
    createdAt: faker.date.anytime().toISOString(),
    updatedAt: faker.date.anytime().toISOString(),
    ...baseAccount,
  };
}

export const MemberFactory = (
  m: Partial<CompleteMember> = {},
): CompleteMember => ({
  email: faker.internet.email(),
  extra: faker.helpers.arrayElement([
    { lang: faker.helpers.arrayElement(['en', 'fr', 'de']) },
    {},
  ]),
  enableSaveActions: m.enableSaveActions ?? true,
  isValidated: m.isValidated ?? true,
  ...BaseAccountFactory({ type: AccountType.Individual }),
  ...m,
});

export const GuestFactory = (
  g: Partial<CompleteGuest> & Pick<CompleteGuest, 'itemLoginSchema'>,
): CompleteGuest => ({
  ...BaseAccountFactory({ type: AccountType.Guest }),
  ...g,
});
