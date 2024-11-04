import { describe, expect, test } from 'vitest';

export function testFunc<Input, Options>(
  name: string,
  func: (i: Input, o: Partial<Options>) => boolean,
  options: Partial<Options>,
  {
    valid,
    invalid,
  }: {
    valid?: Input[];
    invalid?: Input[];
  },
) {
  describe(name, () => {
    if (valid?.length) {
      describe('Valid', () => {
        test.each(valid)('%s', (value) => {
          expect(func(value, options)).toEqual(true);
        });
      });
    }
    if (invalid?.length) {
      describe('Invalid', () => {
        test.each(invalid)('%s', (value) => {
          expect(func(value, options)).toEqual(false);
        });
      });
    }
  });
}
