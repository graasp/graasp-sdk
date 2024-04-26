import { describe, expect, it } from 'vitest';

import { applyEllipsisOnLength } from './string.js';

describe('applyEllipsisOnLength', () => {
  it('does not add ellipsis', () => {
    expect(applyEllipsisOnLength('mystring', 100)).toEqual('mystring');
    expect(applyEllipsisOnLength('my very long string is here', 100)).toEqual(
      'my very long string is here',
    );
  });
  it('add ellipsis', () => {
    expect(applyEllipsisOnLength('mystring', 2)).toEqual('my…');
    expect(applyEllipsisOnLength('my very long string is here', 10)).toEqual(
      'my very lo…',
    );
  });
});
