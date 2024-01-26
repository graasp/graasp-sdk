import { CompleteMember, MemberType } from '.';
import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

export const MemberFactory = Factory.makeFactory<CompleteMember>({
  id: Factory.each(() => faker.string.uuid()),
  name: Factory.each(() => faker.person.fullName()),
  email: Factory.each(() => faker.internet.email()),
  createdAt: Factory.each(() => faker.date.anytime().toISOString()),
  updatedAt: Factory.each(() => faker.date.anytime().toISOString()),
  extra: Factory.each(() =>
    faker.helpers.arrayElement([
      { lang: faker.helpers.arrayElement(['en', 'fr', 'de']) },
      {},
    ]),
  ),
  type: MemberType.Individual, // todo
});
