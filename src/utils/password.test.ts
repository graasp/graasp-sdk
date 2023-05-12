import { isPasswordStrong } from './password';

describe('Password utils', () => {
  describe('isPasswordStrong', () => {
    it('Passwords are allowed', () => {
      expect(isPasswordStrong('huig983jnAfk!')).toBeTruthy();
      expect(isPasswordStrong('passwordWithMajAnd1234')).toBeTruthy();
    });

    it('Passwords are not allowed', () => {
      expect(isPasswordStrong('easy!')).toBeFalsy();
      expect(isPasswordStrong('longbutwithoutnumbers')).toBeFalsy();
      expect(isPasswordStrong('numbersandletters')).toBeFalsy();
      expect(isPasswordStrong('numbersandletters1234')).toBeFalsy();
    });
  });
});
