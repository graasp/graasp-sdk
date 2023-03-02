export const MIME_TYPES = {
  IMAGE: ['image/png', 'image/jpg', 'image/gif', 'image/jpeg', 'image/svg+xml'],
  VIDEO: [
    'video/mp4',
    'video/x-m4v',
    'video/ogg',
    'video/quicktime',
    'video/webm',
  ],
  AUDIO: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav'],
  PDF: ['application/pdf'],
  ZIP: ['application/zip'],
} as const;
