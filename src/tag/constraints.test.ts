import { describe, expect, it } from 'vitest';

import { TAG_NAME_PATTERN } from './constraints.js';

describe('TAG_NAME_PATTERN', () => {
  it('alphanumerical', () => {
    expect(new RegExp(TAG_NAME_PATTERN).test('mytag')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('My tag')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('My wonderful tag')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('tag-with-âccent.')).toBeTruthy();

    expect(new RegExp(TAG_NAME_PATTERN).test('2034')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('my-tag-302')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('a')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('1')).toBeTruthy();
  });
  it('symbols', () => {
    expect(new RegExp(TAG_NAME_PATTERN).test('my-tag')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('My/tag')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('#My tag')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('#mytag')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('My,tag')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('!My_tag')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test(',tag')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('my_Wonderful_tag_')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('@mytag@tag')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('my@tag')).toBeTruthy();
  });
  it('foreign languages', () => {
    expect(new RegExp(TAG_NAME_PATTERN).test('漢')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('漢字')).toBeTruthy();
    expect(new RegExp(TAG_NAME_PATTERN).test('Glück')).toBeTruthy();
  });
  it('one character', () => {
    expect(new RegExp(TAG_NAME_PATTERN).test('.')).toBeFalsy();
    expect(new RegExp(TAG_NAME_PATTERN).test(' ')).toBeFalsy();
    expect(new RegExp(TAG_NAME_PATTERN).test('#')).toBeFalsy();
  });
  it('wrong spacing', () => {
    expect(new RegExp(TAG_NAME_PATTERN).test('    ')).toBeFalsy();
    expect(new RegExp(TAG_NAME_PATTERN).test('my tag ')).toBeFalsy();
    expect(new RegExp(TAG_NAME_PATTERN).test(' my tag')).toBeFalsy();
  });
});
