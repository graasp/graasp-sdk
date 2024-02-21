import { describe, expect, it } from 'vitest';

import { isError } from './errors.js';

describe('Error Utils', () => {
  describe('isError', () => {
    it('should return true', () => {
      expect(isError({ statusCode: 'statusCode' })).toBeTruthy();
      expect(isError(new Error())).toBeTruthy();
    });

    it('should return false', () => {
      expect(isError(null)).toBeFalsy();
      expect(isError(undefined)).toBeFalsy();
      expect(isError({})).toBeFalsy();
      expect(isError([])).toBeFalsy();
      expect(isError({ key: 'value' })).toBeFalsy();
      expect(isError(1)).toBeFalsy();
      expect(isError('string')).toBeFalsy();
    });
  });
});
