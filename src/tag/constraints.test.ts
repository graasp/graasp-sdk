import { describe, expect, it } from 'vitest';

import { TAG_NAME_PATTERN } from './constraints.js';

describe('TAG_NAME_PATTERN', () => {
  it.each([
    'mytag',
    'My tag',
    'MYTAG',
    'My wonderful tag',
    'tag-with-âccent.',
    '2034',
    'my-tag-302',
    'a',
    '1',
  ])('alphanumerical: %s', (v) => {
    expect(new RegExp(TAG_NAME_PATTERN).test(v)).toBeTruthy();
  });
  it.each([
    'my-tag',
    'My/tag',
    '#My tag',
    '#mytag',
    'my.tag.',
    'My,tag',
    '!My_tag',
    ',tag',
    'my_Wonderful_tag_',
    '@mytag@tag',
    'my@tag',
    '2° degrees',
  ])('symbols: %s', (v) => {
    expect(new RegExp(TAG_NAME_PATTERN).test(v)).toBeTruthy();
  });
  it.each(['漢', '漢字', 'Glück', 'Español', 'Математика'])(
    'foreign languages: %s',
    (v) => {
      expect(new RegExp(TAG_NAME_PATTERN).test(v)).toBeTruthy();
    },
  );
  it.each(['.', ' ', '#'])('one character: "%s"', (v) => {
    expect(new RegExp(TAG_NAME_PATTERN).test(v)).toBeFalsy();
  });
  it.each(['    ', 'my tag ', ' my tag'])('wrong spacing: "%s"', (v) => {
    expect(new RegExp(TAG_NAME_PATTERN).test(v)).toBeFalsy();
  });
});
