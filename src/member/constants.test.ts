import { describe, expect, it } from 'vitest';

import { MemberConstants } from './constants.js';

describe('Member constants', () => {
  it.each(['Johnny', "Jéàn de l'Avoiné"])('valid username', (username) => {
    expect(username).toMatch(MemberConstants.USERNAME_FORMAT_REGEX);
  });

  it.each(['<div>', "user1234%66457657'", '  user\u{001A}', '\u{008F}USER'])(
    'invalid username',
    (username) => {
      expect(username).not.toMatch(MemberConstants.USERNAME_FORMAT_REGEX);
    },
  );
});
