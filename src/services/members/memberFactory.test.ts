import { describe, expect, it } from 'vitest';

import { MemberFactory } from './memberFactory';

describe('MemberFactory', () => {
  it('return different values', () => {
    const val1 = MemberFactory();
    const val2 = MemberFactory();
    const val3 = MemberFactory();

    expect(val1).not.toMatchObject(val2);
    expect(val1).not.toMatchObject(val3);
  });
});
