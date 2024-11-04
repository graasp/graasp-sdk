import { describe, expect, it, test } from 'vitest';

import { isStrongPassword } from './isPasswordStrong.js';

const defaultOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

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

  test.each([
    '%2%k{7BsL"M%Kd6e',
    'EXAMPLE of very long_password123!',
    'mxH_+2vs&54_+H3P',
    '+&DxJ=X7-4L8jRCD',
    'etV*p%Nr6w&H%FeF',
    '£3.ndSau_7',
    'VaLIDWith\\Symb0l',
  ])('valid password "%s"', (value) => {
    expect(isStrongPassword(value, defaultOptions)).toBeTruthy();
  });

  test.each([
    '',
    'password',
    'hunter2',
    'hello world',
    'passw0rd',
    'password!',
    'PASSWORD!',
  ])('invalid password "%s"', (value) => {
    expect(isStrongPassword(value, defaultOptions)).toBeFalsy();
  });
});
