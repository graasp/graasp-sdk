import { CompleteMember, MemberType } from '.';
import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

export const MemberFactory = Factory.Sync.makeFactory<CompleteMember>({
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
});
