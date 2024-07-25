import { describe, expect, it } from 'vitest';

import { getFilenameFromItem } from './filename.js';
import { AppItemFactory } from '@/item/appItem/appItem.factory.js';
import { DocumentItemFactory } from '@/item/documentItem/documentItem.factory.js';
import {
  LocalFileItemFactory,
  S3FileItemFactory,
} from '@/item/fileItem/fileItem.factory.js';
import { FolderItemFactory } from '@/item/folderItem/folderItem.factory.js';
import { H5PItemFactory } from '@/item/h5pItem/h5pItem.factory.js';
import { LinkItemFactory } from '@/item/linkItem/linkItem.factory.js';

describe('File name', () => {
  it('get file name from local file item', () => {
    const item = LocalFileItemFactory({
      name: 'myfile',
      extra: {
        file: {
          mimetype: 'image/png',
          content: '',
          name: 'name',
          path: 'path',
          size: 30,
        },
      },
    });
    expect(getFilenameFromItem(item)).toEqual('myfile.png');

    const item1 = LocalFileItemFactory({
      name: 'myfile.png',
      extra: {
        file: {
          mimetype: 'image/png',
          content: '',
          name: 'name',
          path: 'path',
          size: 30,
        },
      },
    });
    expect(getFilenameFromItem(item1)).toEqual('myfile.png');

    const item2 = LocalFileItemFactory({
      name: 'myfile',
      extra: {
        file: {
          mimetype: 'image/jpeg',
          content: '',
          name: 'name',
          path: 'path',
          size: 30,
        },
      },
    });
    expect(getFilenameFromItem(item2)).toEqual('myfile.jpeg');
  });
  it('get file name from s3 file item', () => {
    const item = S3FileItemFactory({
      name: 'myfile',
      extra: {
        s3File: {
          mimetype: 'image/png',
          content: '',
          name: 'name',
          path: 'path',
          size: 30,
        },
      },
    });
    expect(getFilenameFromItem(item)).toEqual('myfile.png');

    const item1 = S3FileItemFactory({
      name: 'myfile.png',
      extra: {
        s3File: {
          mimetype: 'image/png',
          content: '',
          name: 'name',
          path: 'path',
          size: 30,
        },
      },
    });
    expect(getFilenameFromItem(item1)).toEqual('myfile.png');

    const item2 = S3FileItemFactory({
      name: 'myfile',
      extra: {
        s3File: {
          mimetype: 'image/jpeg',
          content: '',
          name: 'name',
          path: 'path',
          size: 30,
        },
      },
    });
    expect(getFilenameFromItem(item2)).toEqual('myfile.jpeg');
  });
  it('get file name from h5p item', () => {
    const item = H5PItemFactory({
      name: 'myh5p',
    });
    expect(getFilenameFromItem(item)).toEqual('myh5p.h5p');
    const item1 = H5PItemFactory({
      name: 'myh5p.h5p',
    });
    expect(getFilenameFromItem(item1)).toEqual('myh5p.h5p');
  });
  it('get file name from app item', () => {
    const item = AppItemFactory({
      name: 'myapp',
    });
    expect(getFilenameFromItem(item)).toEqual('myapp.app');
    const item1 = AppItemFactory({
      name: 'myapp.app',
    });
    expect(getFilenameFromItem(item1)).toEqual('myapp.app');
  });
  it('get file name from link item', () => {
    const item = LinkItemFactory({
      name: 'mylink',
    });
    expect(getFilenameFromItem(item)).toEqual('mylink.url');
    const item1 = LinkItemFactory({
      name: 'mylink.url',
    });
    expect(getFilenameFromItem(item1)).toEqual('mylink.url');
  });
  it('get file name from folder item', () => {
    const item = FolderItemFactory({
      name: 'myfolder',
    });
    expect(getFilenameFromItem(item)).toEqual('myfolder.zip');
  });
  it('get file name from document item', () => {
    const item = DocumentItemFactory({
      name: 'mydoc',
    });
    expect(getFilenameFromItem(item)).toEqual('mydoc.graasp');
    const item1 = DocumentItemFactory({
      name: 'mydoc.graasp',
    });
    expect(getFilenameFromItem(item1)).toEqual('mydoc.graasp');
  });
});
