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
    const defaultValue = 'fr (default)';
    it.each([
      {
        input: { extra: { lang: 'ru' }, type: AccountType.Individual as const },
        res: 'ru',
      },
      {
        input: {
          extra: { lang: undefined },
          type: AccountType.Individual as const,
        },
        res: defaultValue,
      },
      {
        input: { type: AccountType.Guest as const },
        res: defaultValue,
      },
    ])('returns $res when $input.type', ({ input, res }) => {
      expect(getCurrentAccountLang(input, defaultValue)).toEqual(res);
    });

    it.each([
      {
        input: undefined,
      },
      {
        input: null,
      },
    ])('returns undefined when $input', ({ input }) => {
      expect(getCurrentAccountLang(input, defaultValue)).toBeUndefined();
    });
  });
});
