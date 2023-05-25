import { parseStringToDate } from './date';

describe('parseStringToDate', () => {
  it('transform object with date', () => {
    const result = parseStringToDate([
      {
        actions: [
          {
            some: 'string',
            createdAt: '2021-03-16T16:00:50.968Z',
            item: { createdAt: '2021-03-16T16:00:50.968Z' },
            memberships: [
              {
                id: 'id',
                updatedAt: '2021-03-16T16:00:50.968Z',
                createdAt: '2021-03-16T16:00:50.968Z',
              },
            ],
          },
        ],
      },
    ]);
    expect(result).toMatchObject([
      {
        actions: [
          {
            some: 'string',
            createdAt: new Date('2021-03-16T16:00:50.968Z'),
            item: { createdAt: new Date('2021-03-16T16:00:50.968Z') },
            memberships: [
              {
                id: 'id',
                updatedAt: new Date('2021-03-16T16:00:50.968Z'),
                createdAt: new Date('2021-03-16T16:00:50.968Z'),
              },
            ],
          },
        ],
      },
    ]);
  });
  it('transform date', () => {
    const date = '2021-03-16T16:00:50.968Z';
    const result = parseStringToDate(date);
    expect(result).toEqual(new Date(date));
  });
});
