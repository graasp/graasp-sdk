import { describe } from 'vitest';

import { isEmail } from './isEmail.js';
import { testFunc } from './testUtils.js';

describe('isEmail', () => {
  testFunc(
    'Default options',
    isEmail,
    {},
    {
      valid: [
        'foo@bar.com',
        'x@x.au',
        'foo@bar.com.au',
        'foo+bar@bar.com',
        'hans.m端ller@test.com',
        'hans@m端ller.com',
        'test|123@m端ller.com',
        'test123+ext@gmail.com',
        'some.name.midd.leNa.me.and.locality+extension@GoogleMail.com',
        '"foobar"@example.com',
        '"  foo  m端ller "@example.com',
        '"foo\\@bar"@example.com',
        `${'a'.repeat(64)}@${'a'.repeat(63)}.com`,
        `${'a'.repeat(31)}@gmail.com`,
        'test@gmail.com',
        'test.1@gmail.com',
        'test@1337.com',
      ],
      invalid: [
        'foobar@my_sarisari_store.typepad.com',
        'invalidemail@',
        'invalid.com',
        '@invalid.com',
        'foo@bar.com.',
        'foo@_bar.com',
        'somename@ｇｍａｉｌ.com',
        'foo@bar.co.uk.',
        'z@co.c',
        'ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com',
        `${'a'.repeat(64)}@${'a'.repeat(251)}.com`,
        `${'a'.repeat(65)}@${'a'.repeat(250)}.com`,
        `${'a'.repeat(64)}@${'a'.repeat(64)}.com`,
        `${'a'.repeat(64)}@${'a'.repeat(63)}.${'a'.repeat(63)}.${'a'.repeat(63)}.${'a'.repeat(58)}.com`,
        'test1@invalid.co m',
        'test2@invalid.co m',
        'test3@invalid.co m',
        'test4@invalid.co m',
        'test5@invalid.co m',
        'test6@invalid.co m',
        'test7@invalid.co m',
        'test8@invalid.co m',
        'test9@invalid.co m',
        'test10@invalid.co m',
        'test11@invalid.co m',
        'test12@invalid.co　m',
        'test13@invalid.co　m',
        'multiple..dots@stillinvalid.com',
        'test123+invalid! sub_address@gmail.com',
        'gmail...ignores...dots...@gmail.com',
        'ends.with.dot.@gmail.com',
        'multiple..dots@gmail.com',
        'wrong()[]",:;<>@@gmail.com',
        '"wrong()[]",:;<>@@gmail.com',
        'username@domain.com�',
        'username@domain.com©',
        'nbsp test@test.com',
        'nbsp_test@te st.com',
        'nbsp_test@test.co m',
        '"foobar@gmail.com',
        '"foo"bar@gmail.com',
        'foo"bar"@gmail.com',
      ],
    },
  );

  testFunc(
    'Domain specific validation',
    isEmail,
    { domainSpecificValidation: true },
    {
      valid: [
        'foobar@gmail.com',
        'foo.bar@gmail.com',
        'foo.bar@googlemail.com',
        `${'a'.repeat(30)}@gmail.com`,
      ],
      invalid: [
        `${'a'.repeat(31)}@gmail.com`,
        'test@gmail.com',
        'test.1@gmail.com',
        '.foobar@gmail.com',
      ],
    },
  );

  testFunc(
    'Allow underscores',
    isEmail,
    { allowUnderscores: true },
    { valid: ['foobar@my_sarisari_store.typepad.com'] },
  );

  testFunc(
    'Allow UTF8 part',
    isEmail,
    { allowUtf8LocalPart: false },
    {
      valid: [
        'foo@bar.com',
        'x@x.au',
        'foo@bar.com.au',
        'foo+bar@bar.com',
        'hans@m端ller.com',
        'test|123@m端ller.com',
        'test123+ext@gmail.com',
        'some.name.midd.leNa.me+extension@GoogleMail.com',
        '"foobar"@example.com',
        '"foo\\@bar"@example.com',
        '"  foo  bar  "@example.com',
      ],
      invalid: [
        'invalidemail@',
        'invalid.com',
        '@invalid.com',
        'foo@bar.com.',
        'foo@bar.co.uk.',
        'somename@ｇｍａｉｌ.com',
        'hans.m端ller@test.com',
        'z@co.c',
        'tüst@invalid.com',
        'nbsp test@test.com',
      ],
    },
  );

  testFunc(
    'Allow display name',
    isEmail,
    { allowDisplayName: true },
    {
      valid: [
        'foo@bar.com',
        'x@x.au',
        'foo@bar.com.au',
        'foo+bar@bar.com',
        'hans.m端ller@test.com',
        'hans@m端ller.com',
        'test|123@m端ller.com',
        'test123+ext@gmail.com',
        'some.name.midd.leNa.me+extension@GoogleMail.com',
        'Some Name <foo@bar.com>',
        'Some Name <x@x.au>',
        'Some Name <foo@bar.com.au>',
        'Some Name <foo+bar@bar.com>',
        'Some Name <hans.m端ller@test.com>',
        'Some Name <hans@m端ller.com>',
        'Some Name <test|123@m端ller.com>',
        'Some Name <test123+ext@gmail.com>',
        "'Foo Bar, Esq'<foo@bar.com>",
        'Some Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Some Middle Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Name<some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Some Name <foo@gmail.com>',
        'Name🍓With🍑Emoji🚴‍♀️🏆<test@aftership.com>',
        '🍇🍗🍑<only_emoji@aftership.com>',
        '"<displayNameInBrackets>"<jh@gmail.com>',
        '"\\"quotes\\""<jh@gmail.com>',
        '"name;"<jh@gmail.com>',
        '"name;" <jh@gmail.com>',
      ],
      invalid: [
        'invalidemail@',
        'invalid.com',
        '@invalid.com',
        'foo@bar.com.',
        'foo@bar.co.uk.',
        'Some Name <invalidemail@>',
        'Some Name <invalid.com>',
        'Some Name <@invalid.com>',
        'Some Name <foo@bar.com.>',
        'Some Name <foo@bar.co.uk.>',
        'Some Name foo@bar.co.uk.>',
        'Some Name <foo@bar.co.uk.',
        'Some Name < foo@bar.co.uk >',
        'Name foo@bar.co.uk',
        'Some Name <some..name@gmail.com>',
        'Some Name<emoji_in_address🍈@aftership.com>',
        'invisibleCharacter\u001F<jh@gmail.com>',
        '<displayNameInBrackets><jh@gmail.com>',
        '\\"quotes\\"<jh@gmail.com>',
        '""quotes""<jh@gmail.com>',
        'name;<jh@gmail.com>',
        '    <jh@gmail.com>',
        '"    "<jh@gmail.com>',
      ],
    },
  );

  testFunc(
    'Require display name',
    isEmail,
    { requireDisplayName: true },
    {
      valid: [
        'Some Name <foo@bar.com>',
        'Some Name <x@x.au>',
        'Some Name <foo@bar.com.au>',
        'Some Name <foo+bar@bar.com>',
        'Some Name <hans.m端ller@test.com>',
        'Some Name <hans@m端ller.com>',
        'Some Name <test|123@m端ller.com>',
        'Some Name <test123+ext@gmail.com>',
        'Some Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Some Middle Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Name<some.name.midd.leNa.me+extension@GoogleMail.com>',
      ],
      invalid: [
        'some.name.midd.leNa.me+extension@GoogleMail.com',
        'foo@bar.com',
        'x@x.au',
        'foo@bar.com.au',
        'foo+bar@bar.com',
        'hans.m端ller@test.com',
        'hans@m端ller.com',
        'test|123@m端ller.com',
        'test123+ext@gmail.com',
        'invalidemail@',
        'invalid.com',
        '@invalid.com',
        'foo@bar.com.',
        'foo@bar.co.uk.',
        'Some Name <invalidemail@>',
        'Some Name <invalid.com>',
        'Some Name <@invalid.com>',
        'Some Name <foo@bar.com.>',
        'Some Name <foo@bar.co.uk.>',
        'Some Name foo@bar.co.uk.>',
        'Some Name <foo@bar.co.uk.',
        'Some Name < foo@bar.co.uk >',
        'Name foo@bar.co.uk',
      ],
    },
  );

  testFunc(
    'Allow Ip Domain',
    isEmail,
    { allowIpDomain: true },
    {
      valid: ['email@[123.123.123.123]', 'email@255.255.255.255'],
      invalid: [
        'email@0.0.0.256',
        'email@26.0.0.256',
        'email@[266.266.266.266]',
      ],
    },
  );

  testFunc(
    'Blacklisted chars',
    isEmail,
    { blacklistedChars: 'abc"' },
    {
      valid: ['emil@gmail.com'],
      invalid: [
        'email@gmail.com',
        '"foobr"@example.com',
        '" foo m端ller "@example.com',
        '"foo@br"@example.com',
      ],
    },
  );

  testFunc(
    'Ignore Max length allowed',
    isEmail,
    { ignoreMaxLength: true },

    {
      valid: [
        'Deleted-user-id-19430-Team-5051deleted-user-id-19430-team-5051XXXXXX@example.com',
      ],
    },
  );

  testFunc(
    'Ignore Max length disallowed',
    isEmail,
    { ignoreMaxLength: false },
    {
      invalid: [
        'Deleted-user-id-19430-Team-5051deleted-user-id-19430-team-5051XXXXXX@example.com',
        'Deleted-user-id-19430-Team-5051deleted-user-id-19430-team-5051XXXXXX@Deleted-user-id-19430-Team-5051deleted-user-id-19430-team-5051XXXXXX.com',
      ],
    },
  );

  testFunc(
    'Blacklist host',
    isEmail,
    { hostBlacklist: ['gmail.com', 'foo.bar.com'] },
    {
      valid: ['email@foo.gmail.com'],
      invalid: ['foo+bar@gmail.com', 'email@foo.bar.com'],
    },
  );

  testFunc(
    'Whitelist host',
    isEmail,
    { hostWhitelist: ['gmail.com', 'foo.bar.com'] },
    {
      valid: ['email@gmail.com', 'test@foo.bar.com'],
      invalid: ['foo+bar@test.com', 'email@foo.com', 'email@bar.com'],
    },
  );
});
