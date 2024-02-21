import { describe, expect, it } from 'vitest';

import { ClientHostManager } from './hostManager.js';

// TODO: add more tests
describe('Client Host Manager', () => {
  it('Created the Host manager instance', () => {
    expect(ClientHostManager.getInstance()).toBeTruthy();
  });
});
