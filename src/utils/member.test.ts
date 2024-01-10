import { beforeEach, describe, expect, it, vi } from 'vitest';

import { isPseudonymizedMember } from './member';

describe('Member Util Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('isPseudonymizedMember', () => {
    it('check successfully member is pseudonymized for false values', () => {
      const res1 = isPseudonymizedMember('mail');
      expect(res1).toBeFalsy();
      const res2 = isPseudonymizedMember('mail@email.org');
      expect(res2).toBeFalsy();
      const res3 = isPseudonymizedMember('mail@graasp.org');
      expect(res3).toBeFalsy();
    });

    it('check successfully member is pseudonymized for true values', () => {
      const res3 = isPseudonymizedMember('3242-1234567890123@graasp.org');
      expect(res3).toBeTruthy();
    });
  });
});
