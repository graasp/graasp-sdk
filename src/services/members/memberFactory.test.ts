import { describe, expect, it } from 'vitest';

import { MemberFactory } from '.';

describe('MemberFactory', () => {
  it('return different values', () => {
    const val1 = MemberFactory.build();
    const val2 = MemberFactory.build();
    const val3 = MemberFactory.build();

    console.log(val1, val2, val3);

    expect(val1).not.toMatchObject(val2);
    expect(val1).not.toMatchObject(val3);
  });
});
