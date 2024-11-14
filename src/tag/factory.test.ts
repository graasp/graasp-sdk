import { validate } from 'uuid';
import { describe, expect, it } from 'vitest';

import { TagFactory } from './factory.js';
import { TagCategory } from './tag.js';

describe('TagFactory', () => {
  it('create correct tag with empty props', () => {
    const tag = TagFactory();
    expect(validate(tag.id)).toBeTruthy();
    expect(tag.name.length).toBeGreaterThanOrEqual(1);
    expect(Object.values(TagCategory)).toContain(tag.category);
  });
  it('create correct tag with props', () => {
    const tagWithName = TagFactory({ name: 'tagname' });
    expect(validate(tagWithName.id)).toBeTruthy();
    expect(tagWithName.name).toEqual('tagname');
    expect(Object.values(TagCategory)).toContain(tagWithName.category);

    const tagWithCategory = TagFactory({ category: TagCategory.Level });
    expect(validate(tagWithCategory.id)).toBeTruthy();
    expect(tagWithCategory.name.length).toBeGreaterThanOrEqual(1);
    expect(tagWithCategory.category).toEqual(TagCategory.Level);
  });
});
