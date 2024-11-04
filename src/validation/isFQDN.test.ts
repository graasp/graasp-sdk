import { describe } from 'vitest';

import { isFQDN } from './isFQDN.js';
import { testFunc } from './testUtils.js';

describe('isFQDN', () => {
  testFunc(
    'Default Options',
    isFQDN,
    {},
    {
      valid: [
        'domain.com',
        'dom.plato',
        'a.domain.co',
        'foo--bar.com',
        'xn--froschgrn-x9a.com',
        'rebecca.blackfriday',
        '1337.com',
      ],
      invalid: [
        'abc',
        '256.0.0.0',
        '_.com',
        '*.some.com',
        's!ome.com',
        'domain.com/',
        '/more.com',
        'domain.com�',
        'domain.co\u00A0m',
        'domain.co\u1680m',
        'domain.co\u2006m',
        'domain.co\u2028m',
        'domain.co\u2029m',
        'domain.co\u202Fm',
        'domain.co\u205Fm',
        'domain.co\u3000m',
        'domain.com\uDC00',
        'domain.co\uEFFFm',
        'domain.co\uFDDAm',
        'domain.co\uFFF4m',
        'domain.com©',
        'example.0',
        '192.168.0.9999',
        '192.168.0',
        'domain.-com',
        'domain-.com',
      ],
    },
  );

  testFunc(
    'With trailing dot',
    isFQDN,
    { allowTrailingDot: true },
    { valid: ['example.com.'] },
  );

  testFunc(
    'Do not require tld',
    isFQDN,
    { requireTld: false },
    { invalid: ['example.0', '192.168.0', '192.168.0.9999'] },
  );

  testFunc(
    'Do not require tld but allow numeric tld',
    isFQDN,
    { requireTld: false, allowNumericTld: true },
    { valid: ['example.0', '192.168.0', '192.168.0.9999'] },
  );

  testFunc(
    'With wildcard option',
    isFQDN,
    { allowWildcard: true },
    {
      valid: ['*.example.com', '*.shop.example.com'],
    },
  );

  testFunc(
    'Custom options',
    isFQDN,
    {
      allowTrailingDot: true,
      allowUnderscores: true,
      allowNumericTld: true,
    },
    {
      valid: ['abc.efg.g1h.', 'as1s.sad3s.ssa2d.'],
    },
  );
});
