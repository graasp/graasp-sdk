import { formatDate, parseStringToDate } from './date';

describe('Date utils', () => {
  describe('formatDate', () => {
    it('format date to readable string', () => {
      const result = formatDate('2021-03-16T16:00:50.968Z', {
        locale: 'en',
      });
      // test contain without hour because it can be differnt in CI
      expect(result).toContain('Mar 16, 2021');
      const resultFr = formatDate('2021-03-16T16:00:50.968Z', {
        locale: 'fr',
      });
      // test contain without hour because it can be differnt in CI
      expect(resultFr).toContain('16 mars 2021');
    });

    it('format date to relative date', () => {
      const result = formatDate(new Date().toISOString(), { locale: 'en' });
      expect(result).toEqual('now');
      const resultFr = formatDate(new Date().toISOString(), {
        locale: 'fr',
      });
      expect(resultFr).toEqual('maintenant');
    });

    it('format date returns default value', () => {
      const result = formatDate(undefined, {
        locale: 'fr',
      });
      expect(result).toEqual('Unknown');

      const resultMalformattedDate = formatDate('some date', {
        locale: 'fr',
      });
      expect(resultMalformattedDate).toEqual('Unknown');

      const resultCustomDefault = formatDate('some date', {
        locale: 'fr',
        defaultValue: 'Default Date',
      });
      expect(resultCustomDefault).toEqual('Default Date');
    });
  });

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
});
