import { describe, expect, it } from 'vitest';

import { isStrongPassword } from './isPasswordStrong.js';

describe('isStrongPassword', () => {
  it('not a strong password', () => {
    expect(isStrongPassword('', {})).toBeFalsy();
  });
  it('uses default values when not given', () => {
    expect(isStrongPassword('a', { minLength: 1 })).toBeFalsy();
    // need to specify all values for the password to be strong in this setting
    expect(
      isStrongPassword('a', {
        minLength: 1,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      }),
    ).toBeTruthy();
  });
  it('password is strong', () => {
    expect(isStrongPassword('aTest0!zu', {})).toBeTruthy();
  });
});
