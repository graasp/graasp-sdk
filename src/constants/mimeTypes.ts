const JPEG = 'image/jpeg';
const JPG = 'image/jpg';
const PNG = 'image/png';
const GIF = 'image/gif';
const SVG = 'image/svg+xml';

const IMAGE = {
  JPG,
  JPEG,
  PNG,
  GIF,
  SVG,
};

const MP4 = 'video/mp4';
// https://stackoverflow.com/questions/15277147/m4v-mimetype-video-mp4-or-video-m4v
const MP4_Apple = 'video/x-m4v';
const OGG = 'video/ogg';
const QUICKTIME = 'video/quicktime';
const WEBM = 'video/webm';

const VIDEO = {
  MP4,
  MP4_Apple,
  OGG,
  QUICKTIME,
  WEBM,
};

const MPEG = 'audio/mpeg';
const MP3 = 'audio/mp3';
const WAV = 'audio/wav';
const WAV_Chrome = 'audio/x-wav';

const AUDIO = {
  MPEG,
  MP3,
  WAV,
  WAV_Chrome,
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
