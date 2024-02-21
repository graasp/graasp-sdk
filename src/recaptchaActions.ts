import { UnionOfConst } from '@/typeUtils.js';

export const RecaptchaAction = {
  SignIn: 'signIn',
  SignUp: 'signUp',
  SignInWithPassword: 'signInWithPassword',
  SignInWithPasswordMobile: 'signInWithPasswordMobile',
  SignInMobile: 'signInMobile',
  SignUpMobile: 'signUpMobile',
} as const;
export type RecaptchaActionType = UnionOfConst<typeof RecaptchaAction>;
