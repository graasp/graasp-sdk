import { describe, expect, it } from 'vitest';

import { CapsuleItemFactory } from './capsuleItem.factory.js';
import { FolderItemFactory, isCapsule } from '@/index.js';

describe('capsule utils', () => {
  it('isCapsule', () => {
    const capsule = CapsuleItemFactory();
    expect(isCapsule(capsule)).toEqual(true);
    const folder = FolderItemFactory();
    expect(isCapsule(folder)).toEqual(false);
  });
});
