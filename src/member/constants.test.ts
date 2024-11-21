import { describe, expect, it } from 'vitest';

import { MemberConstants } from './constants.js';

describe('Member constants', () => {
  const invalidUsername = '<div>';
  // prettier-ignore
  const invalidUsername1 = 'user1234%66457657\'';
  const invalidUsername2 = '  user\u{001A}';
  const invalidUsername3 = '\u{008F}USER';
  const validUsername = 'Johnny';
  // prettier-ignore
  const validUsername1 = 'Jéàn de l\'Avoiné';

  it('username format regex', () => {
    expect(invalidUsername).not.toMatch(MemberConstants.USERNAME_FORMAT_REGEX);
    expect(invalidUsername1).not.toMatch(MemberConstants.USERNAME_FORMAT_REGEX);
    expect(invalidUsername2).not.toMatch(MemberConstants.USERNAME_FORMAT_REGEX);
    expect(invalidUsername3).not.toMatch(MemberConstants.USERNAME_FORMAT_REGEX);

    expect(validUsername).toMatch(MemberConstants.USERNAME_FORMAT_REGEX);
    expect(validUsername1).toMatch(MemberConstants.USERNAME_FORMAT_REGEX);
  });
});
