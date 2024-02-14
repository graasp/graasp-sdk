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
  ...a,
});
