import { isStrongPassword } from '@/validation/isPasswordStrong.js';

export const isPasswordStrong = (password: string) =>
  isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  });
