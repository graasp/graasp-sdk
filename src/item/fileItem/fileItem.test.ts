import { describe, expect, it } from 'vitest';

import { getFileExtension } from './fileItem.js';

describe('File Item utils', () => {
  describe('getFileExtension', () => {
    it('Simple extensions', () => {
      expect(getFileExtension('sample.txt')).toEqual('.txt');
      expect(getFileExtension('sample.jpeg')).toEqual('.jpeg');
      expect(getFileExtension('s.t')).toEqual('.t');
    });
    it('Simple extensions without dots', () => {
      expect(getFileExtension('sample.txt', { includeDot: false })).toEqual(
        'txt',
      );
      expect(
        getFileExtension('sample.test.txt', { includeDot: false }),
      ).toEqual('txt');
    });
    it('Filename with multiple extensions', () => {
      expect(getFileExtension('sample.test.txt')).toEqual('.txt');
      expect(getFileExtension('sample.test.hello.wow.txt')).toEqual('.txt');
    });
    it('No extensions return undefined', () => {
      expect(getFileExtension('sample')).toEqual(undefined);
      expect(getFileExtension('sample.')).toEqual(undefined);
    });
  });
});
