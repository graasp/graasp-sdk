export enum ItemType {
  APP = 'app',
  DOCUMENT = 'document',
  FOLDER = 'folder',
  LINK = 'embeddedLink',
  LOCAL_FILE = 'file',
  S3_FILE = 's3File',
  SHORTCUT = 'shortcut',
  H5P = 'h5p',
  ETHERPAD = 'etherpad',
}

export type FileItemType = ItemType.S3_FILE | ItemType.LOCAL_FILE;
