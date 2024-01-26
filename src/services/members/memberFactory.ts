import { CompleteMember, MemberType } from '.';
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
  type: MemberType.Individual, // todo
  ...m,
});
