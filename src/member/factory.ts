import {
  BaseAccount,
  CompleteGuest,
  CompleteMember,
  MemberType,
} from './member.js';
import { faker } from '@faker-js/faker';

function baseAccountFactory<T extends MemberType>(
  baseAccount: Partial<BaseAccount> & { type: T },
): BaseAccount & { type: T } {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
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
  ...baseAccountFactory({ type: MemberType.Individual }),
  ...m,
});

export const GuestFactory = (
  g: Partial<CompleteGuest> & Pick<CompleteGuest, 'itemLoginSchema'>,
): CompleteGuest => ({
  ...baseAccountFactory({ type: MemberType.Guest }),
  ...g,
});
