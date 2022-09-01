import { humanFileSize } from './format';

describe('Format Tests', () => {
  describe('humanFileSize', () => {
    it('string should return correct human-readable file size', () => {
      expect(humanFileSize(1551859712)).toEqual('1.4 GiB');
      expect(humanFileSize(5000, true)).toEqual('5.0 kB');
      expect(humanFileSize(5000, false)).toEqual('4.9 KiB');
      expect(humanFileSize(-10000000000000000000000000000)).toEqual(
        '-8271.8 YiB',
      );
      expect(humanFileSize(999949, true)).toEqual('999.9 kB');
      expect(humanFileSize(999950, true)).toEqual('1.0 MB');
      expect(humanFileSize(999950, true, 2)).toEqual('999.95 kB');
      expect(humanFileSize(999500, true, 0)).toEqual('1 MB');
    });
  });
});
