import { describe, expect, it } from 'vitest';

import { ItemConstants } from './constants.js';

const { ITEM_NAME_REGEX } = ItemConstants;

describe('ItemConstants', () => {
  describe('Item name regex', () => {
    it('Name regex accepts words with spaces', () => {
      expect(new RegExp(ITEM_NAME_REGEX).test('Course')).toBeTruthy();
      expect(new RegExp(ITEM_NAME_REGEX).test('My Course')).toBeTruthy();
      expect(
        new RegExp(ITEM_NAME_REGEX).test('My Course from yesterday'),
      ).toBeTruthy();
    });
    it('Name regex rejects string ending with spaces', () => {
      expect(
        new RegExp(ITEM_NAME_REGEX).test('My Course from yesterday '),
      ).toBeFalsy();
      expect(new RegExp(ITEM_NAME_REGEX).test(' Course')).toBeFalsy();
      expect(new RegExp(ITEM_NAME_REGEX).test('My  Course')).toBeFalsy();
    });
  });
});
