import { convertJs } from './immutable';

describe('Immutable', () => {
  describe('convertJS', () => {
    it('Raw', () => {
      const res1 = convertJs(undefined);
      expect(res1).toBe(undefined);
      const res2 = convertJs(null);
      expect(res2).toBe(null);
      const res3 = convertJs(1);
      expect(res3).toBe(1);
      const res4 = convertJs(false);
      expect(res4).toBe(false);
      const res5 = convertJs('string');
      expect(res5).toEqual('string');
    });

    it('Objects', () => {
      const val1 = { a: 'd', b: false };
      const res1 = convertJs(val1);
      expect(res1.toJS()).toEqual(val1);

      // test deep conversion
      const val2 = { a: 'd', b: false, c: { d: 'd', e: { f: true } } };
      const res2 = convertJs(val2);
      expect(res2.toJS()).toEqual(val2);
      expect(res2.c.toJS()).toEqual(val2.c);
      expect(res2.toJS()).toEqual(val2);
      expect(res2.c.e.toJS()).toEqual(val2.c.e);

      // test deep conversion with arrays
      const val3 = {
        a: 'd',
        b: false,
        c: [{ d: 'd', e: { f: true } }, { g: 'g' }],
      };
      const res3 = convertJs(val3);
      expect(res3.toJS()).toEqual(val3);
      expect(res3.c.size).toEqual(2);
      expect(res3.c.toJS()).toEqual(val3.c);
      expect(res3.c.get(0).toJS()).toEqual(val3.c[0]);
    });

    it('Arrays', () => {
      const val1 = [1, 2, 3, 4];
      const res1 = convertJs(val1);
      expect(res1.toJS()).toEqual(val1);
      expect(res1.get(0)).toEqual(val1[0]);
      expect(res1.get(2)).toEqual(val1[2]);

      const val2 = [
        { a: 'd', b: false },
        { a: 'de', b: true },
      ];
      const res2 = convertJs(val2);
      expect(res2.toJS()).toEqual(val2);
      expect(res2.get(0).toJS()).toEqual(val2[0]);
      expect(res2.get(1).toJS()).toEqual(val2[1]);

      const val3 = [
        { a: 'd', b: false },
        { d: 'd', e: { f: true } },
      ];
      const res3 = convertJs(val3);
      expect(res3.toJS()).toEqual(val3);
      expect(res3.get(0).toJS()).toEqual(val3[0]);
      expect(res3.get(1).toJS()).toEqual(val3[1]);
      expect(res3.get(1).e.toJS()).toEqual(val3[1].e);
    });

    it('Dates', () => {
      const val1 = new Date();
      const res1 = convertJs(val1);
      expect(res1).toEqual(val1);

      const val2 = [
        { a: 'd', b: new Date() },
        { a: 'de', b: true },
      ];
      const res2 = convertJs(val2);
      expect(res2.toJS()).toEqual(val2);
      expect(res2.get(0).toJS()).toEqual(val2[0]);
      expect(res2.get(1).toJS()).toEqual(val2[1]);
    });
  });
});
