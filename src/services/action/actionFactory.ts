import { Action } from '.';
import { FolderItemFactory, MemberFactory } from '..';
import { Context } from '@/constants';
import { faker } from '@faker-js/faker';

export const ActionFactory = (a: Partial<Action> = {}): Action => ({
  id: faker.string.uuid(),
  item: faker.helpers.arrayElement([FolderItemFactory(), null]),
  member: faker.helpers.arrayElement([MemberFactory(), null]),
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
