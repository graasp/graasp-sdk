import { describe, expect, it } from 'vitest';

import { countChars, merge } from './utils.js';

describe('countChars', () => {
  it('count empty string', () => {
    expect(countChars('')).toEqual({});
  });
  it('count small string', () => {
    expect(countChars('abcd')).toEqual({ a: 1, b: 1, c: 1, d: 1 });
  });
  it('count repeating string', () => {
    expect(countChars('aaaaaaaaaa')).toEqual({ a: 10 });
  });
  it('count string with spaces', () => {
    expect(countChars(' aaaaaaaaaa ')).toEqual({ a: 10, ' ': 2 });
  });
});

describe('merge', () => {
  it('only default options', () => {
    const defaultOptions = { a: 1, b: false, c: 'test' };
    expect(merge({}, { a: 1, b: false, c: 'test' })).toEqual(defaultOptions);
  });
  it('provided value takes precedence over default options', () => {
    const defaultOptions = { a: 1, b: false, c: 'test' };
    expect(merge({ a: 2 }, { a: 1, b: false, c: 'test' })).toEqual({
      ...defaultOptions,
      a: 2,
    });
  });
  it('value not in options is kept, but should be a ts error', () => {
    const defaultOptions = { a: 1, b: false, c: 'test' };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(merge({ a: 2, k: 'hello' }, { a: 1, b: false, c: 'test' })).toEqual({
      ...defaultOptions,
      a: 2,
      k: 'hello',
    });
  });
});
