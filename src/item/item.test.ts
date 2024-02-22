import { describe, expect, it } from 'vitest';

import { AppItemExtra } from './appItem/appItem.js';
import { DocumentItemExtra } from './documentItem/documentItem.js';
import { EtherpadItemExtra } from './etherpadItem/etherpadItem.js';
import { LocalFileItemExtra, S3FileItemExtra } from './fileItem/fileItem.js';
import { FolderItemExtra } from './folderItem/folderItem.js';
import { H5PItemExtra } from './h5pItem/h5pItem.js';
import { getMimetype } from './item.js';
import { ItemType } from './itemType.js';
import { LinkItemExtra } from './linkItem/linkItem.js';
import { ShortcutItemExtra } from './shortcutItem/shortcutItem.js';

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
      expect(getMimetype({ [ItemType.LINK]: {} } as LinkItemExtra)).toEqual(
        undefined,
      );
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
