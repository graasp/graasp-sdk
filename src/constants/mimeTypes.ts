const IMAGE = {
  JPG: 'image/jpg',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
  SVG: 'image/svg+xml',
};

const VIDEO = {
  MP4: 'video/mp4',
  // https://stackoverflow.com/questions/15277147/m4v-mimetype-video-mp4-or-video-m4v
  MP4_Apple: 'video/x-m4v',
  OGG: 'video/ogg',
  QUICKTIME: 'video/quicktime',
  WEBM: 'video/webm',
};

const AUDIO = {
  MPEG: 'audio/mpeg',
  MP3: 'audio/mp3',
  WAV: 'audio/wav',
  WAV_Chrome: 'audio/x-wav',
};

const PDF = 'application/pdf';

const ZIP = 'application/zip';

export const MIME_TYPES = {
  IMAGE,
  VIDEO,
  AUDIO,
  PDF,
  ZIP,
  isImage: (mimetype: string) => Object.values(IMAGE).includes(mimetype),
  isAudio: (mimetype: string) => Object.values(AUDIO).includes(mimetype),
  isVideo: (mimetype: string) => Object.values(VIDEO).includes(mimetype),
  isPdf: (mimetype: string) => [PDF].includes(mimetype),
  isZip: (mimetype: string) => [ZIP].includes(mimetype),
} as const;
