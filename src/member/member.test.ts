import { beforeEach, describe, expect, it, vi } from 'vitest';

import { isPseudoMember } from './member.js';

describe('Member Util Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('isPseudoMember', () => {
    it('check successfully member is pseudonymized for false values', () => {
      const res1 = isPseudoMember({ email: 'mail' });
      expect(res1).toBeFalsy();
      const res2 = isPseudoMember({ email: 'mail@email.org' });
      expect(res2).toBeFalsy();
      const res3 = isPseudoMember({ email: 'mail@graasp.org' });
      expect(res3).toBeFalsy();
    });

    it('check successfully member is pseudonymized for true values', () => {
      const res3 = isPseudoMember({ email: '3242-1234567890123@graasp.org' });
      expect(res3).toBeTruthy();
    });
  });
});
