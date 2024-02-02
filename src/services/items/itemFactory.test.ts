import { describe, expect, it } from 'vitest';

import {
  AppItemFactory,
  DocumentItemFactory,
  EmbeddedLinkItemFactory,
  EtherpadItemFactory,
  FolderItemFactory,
  H5PItemFactory,
  LocalFileItemFactory,
  S3FileItemFactory,
  ShortcutItemFactory,
} from '.';
import { MemberFactory } from '..';
import { ItemType } from '@/constants';

describe('ItemFactor General', () => {
  it('Returns correct path for id', () => {
    const item = FolderItemFactory({
      id: '2d11f9d9-fbbe-4e0a-9a13-0999ca20bebc',
    });
    expect(item.path).toEqual('2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc');
  });
  it('Returns correct path for parentItem', () => {
    const item1 = FolderItemFactory({
      parentItem: FolderItemFactory({
        id: '3d11f9d9-fbbe-4e0a-9a13-0999ca20bebc',
      }),
    });
    expect(item1.path).toContain('3d11f9d9_fbbe_4e0a_9a13_0999ca20bebc');
    const item2 = FolderItemFactory({
      id: '2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc',
      parentItem: FolderItemFactory({
        id: '3d11f9d9-fbbe-4e0a-9a13-0999ca20bebc',
      }),
    });
    expect(item2.path).toEqual(
      '3d11f9d9_fbbe_4e0a_9a13_0999ca20bebc.2d11f9d9_fbbe_4e0a_9a13_0999ca20bebc',
    );
  });
  it('Allow null creator', () => {
    const item1 = FolderItemFactory({
      creator: null,
    });
    expect(item1.creator).toBeNull();
  });
  it('Default to hasThumbnail = false', () => {
    const item1 = FolderItemFactory({});
    expect(item1.settings.hasThumbnail).toBeFalsy();
  });
});

describe('FolderItemFactory', () => {
  it('Create different items', () => {
    const item1 = FolderItemFactory();
    const item2 = FolderItemFactory();
    expect(item1).not.toEqual(item2);
  });

  it('Create folder item', () => {
    const item = FolderItemFactory();
    expect(item.extra.folder).toEqual({ childrenOrder: [] });
    expect(item.type).toEqual(ItemType.FOLDER);
  });

  it('Create folder item with args', () => {
    const creator = MemberFactory();
    const item = FolderItemFactory({
      creator,
      name: 'name',
      description: 'description',
      extra: { folder: { childrenOrder: ['uuid'] } },
      settings: { enableSaveActions: true },
    });
    expect(item.name).toEqual('name');
    expect(item.creator!.id).toEqual(creator.id);
    expect(item.description).toEqual('description');
    expect(item.extra.folder).toEqual({ childrenOrder: ['uuid'] });
    expect(item.settings.enableSaveActions).toEqual(true);
    expect(item.type).toEqual(ItemType.FOLDER);
  });
});

describe('AppItemFactory', () => {
  it('Create different items', () => {
    const item1 = AppItemFactory();
    const item2 = AppItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create app item', () => {
    const item = AppItemFactory();
    expect(item.extra.app.url).toContain('http');
    expect(item.extra.app.settings).toBeDefined();
    expect(item.type).toEqual(ItemType.APP);
  });
  it('Create app item with args', () => {
    const item = AppItemFactory({
      name: 'name',
      description: 'description',
      extra: { app: { url: 'url' } },
    });
    expect(item.extra.app.url).toEqual('url');
    expect(item.name).toEqual('name');
    expect(item.description).toEqual('description');
    expect(item.type).toEqual(ItemType.APP);
  });
});

describe('H5PItemFactory', () => {
  it('Create different items', () => {
    const item1 = H5PItemFactory();
    const item2 = H5PItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create h5p item', () => {
    const item = H5PItemFactory();
    expect(item.extra.h5p.contentId.length).toBeGreaterThan(10);
    expect(item.extra.h5p.h5pFilePath.length).toBeGreaterThan(3);
    expect(item.extra.h5p.contentFilePath.length).toBeGreaterThan(3);
    expect(item.type).toEqual(ItemType.H5P);
  });
  it('Create h5p item with args', () => {
    const item = H5PItemFactory({
      extra: {
        h5p: {
          contentFilePath: 'string',
          contentId: 'id',
          h5pFilePath: 'path',
        },
      },
    });
    expect(item.extra.h5p.contentId).toEqual('id');
    expect(item.extra.h5p.h5pFilePath).toEqual('path');
    expect(item.extra.h5p.contentFilePath).toEqual('string');
    expect(item.type).toEqual(ItemType.H5P);
  });
});

describe('DocumentItemFactory', () => {
  it('Create different items', () => {
    const item1 = DocumentItemFactory();
    const item2 = DocumentItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create document item', () => {
    const item = DocumentItemFactory();
    expect(item.type).toEqual(ItemType.DOCUMENT);
    expect(item.extra.document.content.length).toBeGreaterThan(3);
  });
  it('Create document item with args', () => {
    const item = DocumentItemFactory({
      extra: { document: { content: 'content' } },
    });
    expect(item.type).toEqual(ItemType.DOCUMENT);
    expect(item.extra.document.content).toEqual('content');
  });
});

describe('EmbeddedLinkItemFactory', () => {
  it('Create different items', () => {
    const item1 = EmbeddedLinkItemFactory();
    const item2 = EmbeddedLinkItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create link item', () => {
    const item = EmbeddedLinkItemFactory();
    if (item.extra.embeddedLink.html) {
      expect(item.extra.embeddedLink.html.length).toBeGreaterThan(3);
    }
    if (item.extra.embeddedLink.icons) {
      expect(item.extra.embeddedLink.icons[0].length).toBeGreaterThan(3);
    }
    if (item.extra.embeddedLink.thumbnails) {
      expect(item.extra.embeddedLink.thumbnails[0].length).toBeGreaterThan(3);
    }
    expect(item.extra.embeddedLink.url.length).toBeGreaterThan(3);
    expect(item.type).toEqual(ItemType.LINK);
  });
  it('Create link item with args', () => {
    const item = EmbeddedLinkItemFactory({
      extra: {
        embeddedLink: {
          html: 'html',
          icons: ['icon'],
          thumbnails: ['thumbnail'],
          url: 'url',
        },
      },
    });
    expect(item.extra.embeddedLink.html).toEqual('html');
    expect(item.extra.embeddedLink.icons![0]).toEqual('icon');
    expect(item.extra.embeddedLink.thumbnails![0]).toEqual('thumbnail');
    expect(item.type).toEqual(ItemType.LINK);
    expect(item.extra.embeddedLink.url).toEqual('url');
  });
});

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

describe('EtherpadItemFactory', () => {
  it('Create different items', () => {
    const item1 = EtherpadItemFactory();
    const item2 = EtherpadItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create etherpad item', () => {
    const item = EtherpadItemFactory();
    expect(item.extra.etherpad.padID.length).toBeGreaterThan(3);
    expect(item.type).toEqual(ItemType.ETHERPAD);
    expect(item.extra.etherpad.groupID.length).toBeGreaterThan(3);
  });
  it('Create etherpad item with args', () => {
    const item = EtherpadItemFactory({
      extra: { etherpad: { groupID: 'id', padID: 'padId' } },
    });
    expect(item.extra.etherpad.padID).toEqual('padId');
    expect(item.type).toEqual(ItemType.ETHERPAD);
    expect(item.extra.etherpad.groupID).toEqual('id');
  });
});

describe('ShortcutItemFactory', () => {
  it('Create different items', () => {
    const item1 = ShortcutItemFactory();
    const item2 = ShortcutItemFactory();
    expect(item1).not.toEqual(item2);
  });
  it('Create etherpad item', () => {
    const item = ShortcutItemFactory();
    expect(item.extra.shortcut.target.length).toBeGreaterThan(3);
    expect(item.type).toEqual(ItemType.SHORTCUT);
  });
  it('Create shortcut item with args', () => {
    const item = ShortcutItemFactory({ extra: { shortcut: { target: 'd' } } });
    expect(item.extra.shortcut.target).toEqual('d');
    expect(item.type).toEqual(ItemType.SHORTCUT);
  });
});
