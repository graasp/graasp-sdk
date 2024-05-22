import { v4 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { ClientHostManager } from './hostManager.js';
import { Context } from '@/enums/context.js';

// TODO: add more tests
describe('Client Host Manager', () => {
  it('Created the Host manager instance', () => {
    expect(ClientHostManager.getInstance()).toBeTruthy();
  });

  it('Add query strings for context', () => {
    const manager = ClientHostManager.getInstance();
    manager.addHost(Context.Builder, new URL('http://localhost.com'));
    manager.addPrefix(Context.Builder, '');
    expect(
      manager.getItemLink(Context.Builder, v4(), { mode: 'grid' }),
    ).toContain('grid');
  });
});
