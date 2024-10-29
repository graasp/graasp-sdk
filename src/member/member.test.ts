import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  AccountType,
  getCurrentAccountLang,
  isPseudoMember,
} from './member.js';

describe('Member Util Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('isPseudoMember', () => {
    it('check successfully member is pseudonymized for false values', () => {
      const res1 = isPseudoMember({ type: AccountType.Individual });
      expect(res1).toBeFalsy();
      const res2 = isPseudoMember({ type: AccountType.Group });
      expect(res2).toBeFalsy();
    });

    it('check successfully member is pseudonymized for true values', () => {
      const res3 = isPseudoMember({ type: AccountType.Guest });
      expect(res3).toBeTruthy();
    });
  });

  describe('getCurrentAccountLang', () => {
    it.each([
      { input: { extra: { lang: 'ru' } }, res: 'ru' },
      { input: { extra: { lang: undefined } }, res: undefined },
    ])('returns a member language', ({ input, res }) => {
      expect(
        getCurrentAccountLang(
          {
            type: AccountType.Individual,
            ...input,
          },
          'fr',
        ),
      ).toEqual(res);
    });

    it('returns default', () => {
      const res = getCurrentAccountLang(undefined, 'fr');
      expect(res).toBeUndefined();
      expect(
        getCurrentAccountLang(
          {
            type: AccountType.Guest,
          },
          'test',
        ),
      ).toEqual('test');
    });
  });
});
