import { CompleteMember, MemberType } from './member.js';
import { faker } from '@faker-js/faker';

export const MemberFactory = (
  m: Partial<CompleteMember> = {},
): CompleteMember => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedAt: faker.date.anytime().toISOString(),
  extra: faker.helpers.arrayElement([
    { lang: faker.helpers.arrayElement(['en', 'fr', 'de']) },
    {},
  ]),
  // todo: handle other member type when useful in backend
  type: MemberType.Individual,
  enableSaveActions: m.enableSaveActions ?? true,
  ...m,
});
