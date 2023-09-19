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

export type FileItemType = typeof ItemType.S3_FILE | typeof ItemType.LOCAL_FILE;
