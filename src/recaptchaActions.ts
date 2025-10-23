import { UnionOfConst } from '@/typeUtils.js';

export const RecaptchaAction = {
  SignIn: 'signIn',
  SignUp: 'signUp',
  SignInWithPassword: 'signInWithPassword',
  ResetPassword: 'resetPassword',
} as const;
export type RecaptchaActionType = UnionOfConst<typeof RecaptchaAction>;
