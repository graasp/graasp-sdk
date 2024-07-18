import { Action } from './action.js';
import { Context } from '@/enums/context.js';
import { faker } from '@faker-js/faker';

export const ActionFactory = (a: Partial<Action> = {}): Action => ({
  id: faker.string.uuid(),
  // member and item default to null
  account: null,
  item: null,
  view: faker.helpers.arrayElement(Object.values(Context)),
  type: faker.lorem.word(),
  extra: { value: faker.lorem.word() },
  createdAt: faker.date.anytime().toISOString(),
  geolocation: faker.helpers.arrayElement([
    null,
    // geoip.Lookup
    {
      range: [faker.number.int, faker.number.int],
      country: faker.location.country(),
      timezone: faker.location.timeZone(),
      city: faker.location.city(),
      ll: [faker.location.latitude(), faker.location.longitude()],
    },
  ]),
  ...a,
});
