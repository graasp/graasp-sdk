import { describe } from 'vitest';

import { isByteLength } from './isByteLength.js';
import { testFunc } from './testUtils.js';

describe('isByteLength', () => {
  testFunc(
    'only min for "%s"',
    isByteLength,
    { min: 2 },
    {
      valid: ['abc', 'de', 'abcd', 'ｇｍａｉｌ'],
      invalid: ['', 'a'],
    },
  );
  testFunc(
    'min and max for "%s"',
    isByteLength,
    { min: 2, max: 3 },
    { valid: ['abc', 'de', 'ｇ'], invalid: ['', 'a', 'abcd', 'ｇｍ'] },
  );
  testFunc(
    'only max for "%s"',
    isByteLength,
    { max: 3 },
    {
      valid: ['abc', 'de', 'ｇ', 'a', ''],
      invalid: ['abcd', 'ｇｍ'],
    },
  );
  testFunc(
    'only max for "%s"',
    isByteLength,
    { max: 0 },
    {
      valid: [''],
      invalid: ['ｇ', 'a'],
    },
  );
});
