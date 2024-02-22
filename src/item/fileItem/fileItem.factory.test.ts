import { describe, expect, it } from 'vitest';

import { ItemType } from '../itemType.js';
import { LocalFileItemFactory, S3FileItemFactory } from './fileItem.factory.js';

describe('LocalFileItemFactory', () => {
  it('Create different items', () => {
    const item1 = LocalFileItemFactory();
    const item2 = LocalFileItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create local file item', () => {
    const item = LocalFileItemFactory();
    expect(item.extra.file.name.length).toBeGreaterThan(3);
    expect(item.extra.file.mimetype.length).toBeGreaterThan(3);
    expect(item.extra.file.path.length).toBeGreaterThan(3);
    if (item.extra.file.altText) {
      expect(item.extra.file.altText.length).toBeGreaterThan(1);
    }
    expect(item.extra.file.content.length).toBeGreaterThan(3);
    expect(item.type).toEqual(ItemType.LOCAL_FILE);
    expect(item.extra.file.size).toBeGreaterThanOrEqual(1);
  });
  it('Create local file item with args', () => {
    const item = LocalFileItemFactory({
      extra: {
        file: {
          name: 'name',
          content: 'content',
          mimetype: 'mimetype',
          path: 'path',
          size: 1,
        },
      },
    });
    expect(item.extra.file.name).toEqual('name');
    expect(item.extra.file.mimetype).toEqual('mimetype');
    expect(item.extra.file.path).toEqual('path');
    expect(item.extra.file.altText).toBeUndefined();
    expect(item.extra.file.content).toEqual('content');
    expect(item.type).toEqual(ItemType.LOCAL_FILE);
    expect(item.extra.file.size).toEqual(1);
  });
});

describe('S3FileItemFactory', () => {
  it('Create different items', () => {
    const item1 = S3FileItemFactory();
    const item2 = S3FileItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create s3 file item', () => {
    const item = S3FileItemFactory();
    expect(item.extra.s3File.name.length).toBeGreaterThan(3);
    expect(item.extra.s3File.mimetype.length).toBeGreaterThan(3);
    expect(item.extra.s3File.path.length).toBeGreaterThan(3);
    if (item.extra.s3File.altText) {
      expect(item.extra.s3File.altText.length).toBeGreaterThan(1);
    }
    expect(item.extra.s3File.content.length).toBeGreaterThan(3);
    expect(item.type).toEqual(ItemType.S3_FILE);
    expect(item.extra.s3File.size).toBeGreaterThanOrEqual(1);
  });
  it('Create s3 file item with args', () => {
    const item = S3FileItemFactory({
      extra: {
        s3File: {
          name: 'name',
          content: 'content',
          mimetype: 'mimetype',
          path: 'path',
          size: 1,
        },
      },
    });
    expect(item.extra.s3File.name).toEqual('name');
    expect(item.extra.s3File.mimetype).toEqual('mimetype');
    expect(item.extra.s3File.path).toEqual('path');
    expect(item.extra.s3File.altText).toBeUndefined();
    expect(item.extra.s3File.content).toEqual('content');
    expect(item.type).toEqual(ItemType.S3_FILE);
    expect(item.extra.s3File.size).toEqual(1);
  });
});
