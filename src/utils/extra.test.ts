import { describe, expect, it } from 'vitest';

import { getMimetype } from '.';
import {
  AppItemExtra,
  DocumentItemExtra,
  EmbeddedLinkItemExtra,
  EtherpadItemExtra,
  FolderItemExtra,
  H5PItemExtra,
  ItemType,
  LocalFileItemExtra,
  S3FileItemExtra,
  ShortcutItemExtra,
} from '..';

describe('Extra Utils', () => {
  describe('getMimetype', () => {
    it('should return undefined', () => {
      expect(getMimetype({ [ItemType.FOLDER]: {} } as FolderItemExtra)).toEqual(
        undefined,
      );
      expect(getMimetype({ [ItemType.APP]: {} } as AppItemExtra)).toEqual(
        undefined,
      );
      expect(
        getMimetype({ [ItemType.SHORTCUT]: {} } as ShortcutItemExtra),
      ).toEqual(undefined);
      expect(
        getMimetype({ [ItemType.DOCUMENT]: {} } as DocumentItemExtra),
      ).toEqual(undefined);
      expect(
        getMimetype({ [ItemType.ETHERPAD]: {} } as EtherpadItemExtra),
      ).toEqual(undefined);
      expect(getMimetype({ [ItemType.H5P]: {} } as H5PItemExtra)).toEqual(
        undefined,
      );
      expect(
        getMimetype({ [ItemType.LINK]: {} } as EmbeddedLinkItemExtra),
      ).toEqual(undefined);
    });

    it('should return mimetype', () => {
      expect(
        getMimetype({
          [ItemType.LOCAL_FILE]: { mimetype: 'mp3' },
        } as LocalFileItemExtra),
      ).toEqual('mp3');
      expect(
        getMimetype({
          [ItemType.S3_FILE]: { mimetype: 'wave' },
        } as S3FileItemExtra),
      ).toEqual('wave');
    });
  });
});
