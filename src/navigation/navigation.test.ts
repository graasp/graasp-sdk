import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as cookieUtils from '../cookie/cookie.js';
import {
  buildPdfViewerLink,
  buildPdfViewerURL,
  redirect,
  redirectToSavedUrl,
} from './navigation.js';

export const MOCK_ITEM_ID = '1234';
const MOCK_URL = 'https://example.com';

const mockTarget = {
  open: vi.fn(),
  location: {
    assign: vi.fn(),
  },
};

describe('Navigation Util Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('redirect', () => {
    it('redirect successfully for default values', () => {
      redirect(mockTarget, MOCK_URL);
      expect(mockTarget.location.assign.mock.calls[0]).toEqual([MOCK_URL]);
    });

    it('redirect successfully in new tab with name', () => {
      const args = { name: 'somename', openInNewTab: true };
      redirect(mockTarget, MOCK_URL, args);
      expect(mockTarget.open.mock.calls[0]).toEqual([MOCK_URL, args.name]);
    });
  });

  describe('redirectToSavedUrl', () => {
    it('redirect successfully to saved link', () => {
      vi.spyOn(cookieUtils, 'getUrlForRedirection').mockReturnValue(
        'https://google.com',
      );
      redirectToSavedUrl(mockTarget);
      expect(mockTarget.location.assign.mock.calls[0]).toEqual([
        'https://google.com',
      ]);
    });

    it('redirect successfully to default link', () => {
      vi.spyOn(cookieUtils, 'getUrlForRedirection').mockReturnValue(undefined);
      redirectToSavedUrl(mockTarget, MOCK_URL);
      expect(mockTarget.location.assign.mock.calls[0]).toEqual([MOCK_URL]);
    });

    it('redirect successfully to saved link in new tab', () => {
      const args = { name: 'somename', openInNewTab: true };
      vi.spyOn(cookieUtils, 'getUrlForRedirection').mockReturnValue(MOCK_URL);
      redirectToSavedUrl(mockTarget, MOCK_URL, args);
      expect(mockTarget.open.mock.calls[0]).toEqual([MOCK_URL, args.name]);
    });

    it('redirect successfully to default link in new tab', () => {
      const args = { name: 'somename', openInNewTab: true };
      redirectToSavedUrl(mockTarget, MOCK_URL, args);
      expect(mockTarget.open.mock.calls[0]).toEqual([MOCK_URL, args.name]);
    });
  });

  describe('buildPdfViewerLink', () => {
    const assetsUrl = 'assetsUrl';

    it('build url without asset url', () => {
      const res = buildPdfViewerLink();
      expect(res).toEqual('');

      const res1 = buildPdfViewerLink('');
      expect(res1).toEqual('');
    });

    it('build url with asset url', () => {
      const res = buildPdfViewerLink(assetsUrl);
      expect(res).toContain(assetsUrl);
    });
  });

  describe('buildPdfViewerURL', () => {
    const assetsUrl = 'localhost';
    const assetsUrlWithProtocol = 'http://localhost';
    const assetsUrlWithProtocolAndPath = 'http://localhost/assets/';

    it('undefined if url is not provided', () => {
      const res = buildPdfViewerURL();
      expect(res).toBeUndefined();
    });
    it('undefined if url is empty', () => {
      const res = buildPdfViewerURL('');
      expect(res).toBeUndefined();
    });
    it('build url with asset url being just a domain', () => {
      const res = buildPdfViewerURL(assetsUrl);
      expect(res?.toString()).toMatch(/https:\/\/localhost\/pdf-viewer*/i);
    });
    it('build url with asset url containing protocol', () => {
      const res = buildPdfViewerURL(assetsUrlWithProtocol);
      expect(res?.toString()).toMatch(/http:\/\/localhost\/pdf-viewer*/i);
    });
    it('build url with asset url containing protocol and path', () => {
      const res = buildPdfViewerURL(assetsUrlWithProtocolAndPath);
      expect(res?.toString()).toMatch(
        /http:\/\/localhost\/assets\/pdf-viewer*/i,
      );
    });
  });
});
