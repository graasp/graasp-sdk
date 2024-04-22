import { describe, expect, it } from 'vitest';

import { formatFileSize } from './fileSize.js';

describe('File Size', () => {
  it('format file size (binary) to human readable string', () => {
    expect(formatFileSize(1024)).toEqual('1 KB');
    expect(formatFileSize(1024 * 1024)).toEqual('1 MB');
    expect(formatFileSize(1024 * 1024 * 1024)).toEqual('1 GB');
  });
});
