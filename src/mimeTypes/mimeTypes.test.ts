import { describe, expect, it } from 'vitest';

import { MimeTypes } from './mimeTypes.js';

describe('MimeTypes', () => {
  it('is a PDF', () => {
    expect(MimeTypes.isPdf(MimeTypes.PDF)).toBeTruthy();
  });
  it('is a ZIP', () => {
    expect(MimeTypes.isZip(MimeTypes.ZIP)).toBeTruthy();
  });
  it('is an Image', () => {
    expect(MimeTypes.isImage(MimeTypes.Image.WEBP)).toBeTruthy();
    expect(MimeTypes.isImage('image/png')).toBeTruthy();
  });
  it('is an Audio', () => {
    expect(MimeTypes.isAudio(MimeTypes.Audio.MP3)).toBeTruthy();
    expect(MimeTypes.isAudio('audio/mp3')).toBeTruthy();
  });
  it('is a Document', () => {
    expect(MimeTypes.isDocument(MimeTypes.Document.DOCX)).toBeTruthy();
    expect(MimeTypes.isDocument('application/msword')).toBeTruthy();
  });
  it('is a Presentation', () => {
    expect(MimeTypes.isPresentation(MimeTypes.Presentation.PPTX)).toBeTruthy();
    expect(MimeTypes.isPresentation('application/vnd.ms-powerpoint')).toBeTruthy();
  });
  it('is a Spreadsheet', () => {
    expect(MimeTypes.isAudio(MimeTypes.Spreadsheet.XLSX)).toBeTruthy();
    expect(MimeTypes.isAudio('application/vnd.ms-excel')).toBeTruthy();
  });
});
