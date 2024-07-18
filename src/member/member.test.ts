import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MemberType, isPseudoMember } from './member.js';

describe('Member Util Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('isPseudoMember', () => {
    it('check successfully member is pseudonymized for false values', () => {
      const res1 = isPseudoMember({ type: MemberType.Individual });
      expect(res1).toBeFalsy();
      const res2 = isPseudoMember({ type: MemberType.Group });
      expect(res2).toBeFalsy();
    });

    it('check successfully member is pseudonymized for true values', () => {
      const res3 = isPseudoMember({ type: MemberType.Guest });
      expect(res3).toBeTruthy();
    });
  });
});
