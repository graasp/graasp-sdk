const Image = {
  JPG: 'image/jpg',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
  SVG: 'image/svg+xml',
  WEBP: 'image/webp',
};

const Video = {
  MP4: 'video/mp4',
  // https://stackoverflow.com/questions/15277147/m4v-mimetype-video-mp4-or-video-m4v
  MP4_Apple: 'video/x-m4v',
  OGG: 'video/ogg',
  QUICKTIME: 'video/quicktime',
  WEBM: 'video/webm',
};

const Audio = {
  MPEG: 'audio/mpeg',
  MP3: 'audio/mp3',
  WAV: 'audio/wav',
  WAV_Chrome: 'audio/x-wav',
};

const PDF = 'application/pdf';

const ZIP = 'application/zip';

const Document = {
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ODT: 'application/vnd.oasis.opendocument.text',
  DOC: 'application/msword',
};

const Presentation = {
  PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  PPT: 'application/vnd.ms-powerpoint',
};

const Spreadsheet = {
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  XLS: 'application/vnd.ms-excel',
};

export const MimeTypes = {
  Image,
  Video,
  Audio,
  PDF,
  ZIP,
  Document,
  Spreadsheet,
  Presentation,
  isImage: (mimetype: string) => Object.values(Image).includes(mimetype),
  isAudio: (mimetype: string) => Object.values(Audio).includes(mimetype),
  isVideo: (mimetype: string) => Object.values(Video).includes(mimetype),
  isPdf: (mimetype: string) => [PDF].includes(mimetype),
  isZip: (mimetype: string) => [ZIP].includes(mimetype),
  isDocument: (mimetype: string) => Object.values(Document).includes(mimetype),
  isPresentation: (mimetype: string) =>
    Object.values(Presentation).includes(mimetype),
  isSpreadsheet: (mimetype: string) =>
    Object.values(Spreadsheet).includes(mimetype),
} as const;
