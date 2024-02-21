import { describe, expect, it } from 'vitest';

import { partitionArray as partition, spliceIntoChunks } from './array.js';

const mockArray = [0, 1, 2, 3, 4, 5];

describe('Array utils', () => {
  describe('partition', () => {
    it('Successfully split array', () => {
      const result = partition(mockArray, (el) => el < 4);
      expect(result).toEqual([
        [0, 1, 2, 3],
        [4, 5],
      ]);

      const result1 = partition(mockArray, (el) => el > -1);
      expect(result1).toEqual([[0, 1, 2, 3, 4, 5], []]);

      const result2 = partition(mockArray, (el) => el < -1);
      expect(result2).toEqual([[], [0, 1, 2, 3, 4, 5]]);
    });
  });

  describe('spliceIntoChunks', () => {
    it('Throws for invalid chunk sizes', () => {
      expect(() => spliceIntoChunks(mockArray, 0)).toThrow();
      expect(() => spliceIntoChunks(mockArray, -10)).toThrow();
    });

    it('Return array if chunk size is bigger than array length', () => {
      const result = spliceIntoChunks(mockArray, mockArray.length);
      expect(result).toEqual([mockArray]);
    });

    it('Split array in half', () => {
      const result = spliceIntoChunks(mockArray, mockArray.length / 2);
      expect(result).toEqual([
        [0, 1, 2],
        [3, 4, 5],
      ]);
    });

    it('Split array in three parts', () => {
      const result = spliceIntoChunks(mockArray, mockArray.length / 3);
      expect(result).toEqual([
        [0, 1],
        [2, 3],
        [4, 5],
      ]);
    });

    it('Split array for float number', () => {
      const result = spliceIntoChunks(mockArray, mockArray.length / 2.5);
      expect(result).toEqual([
        [0, 1],
        [2, 3],
        [4, 5],
      ]);
    });
  });
});
