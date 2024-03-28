import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as cookieUtils from '../cookie/cookie.js';
import { DEFAULT_PROTOCOL } from './constants.js';
import {
  buildItemLinkForBuilder,
  buildPdfViewerLink,
  buildPdfViewerURL,
  buildSignInPath,
  redirect,
  redirectToSavedUrl,
} from './navigation.js';

export const MOCK_ITEM_ID = '1234';
const MOCK_URL = 'https://example.com';
const MOCK_HOST = 'myhost';
const MOCK_HOST_WITH_PROTOCOL = 'https://myhost.com';

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

  describe('buildSignInPath', () => {
    it('build sign in path', () => {
      const res = buildSignInPath({ host: MOCK_HOST_WITH_PROTOCOL });
      expect(res).toContain(MOCK_HOST_WITH_PROTOCOL);
    });
    it('build sign in path with redirection url', () => {
      const redirectionUrl = 'https://test.com';
      const res = buildSignInPath({
        host: MOCK_HOST_WITH_PROTOCOL,
        redirectionUrl,
      });
      expect(res).toContain(MOCK_HOST_WITH_PROTOCOL);
      expect(res).toContain(`?url=${encodeURIComponent(redirectionUrl)}`);
    });
  });

  describe('buildItemLinkForBuilder', () => {
    it('build item path without specifying chat status', () => {
      const res = buildItemLinkForBuilder({
        origin: {
          hostName: MOCK_HOST,
          protocol: DEFAULT_PROTOCOL,
        },
        itemId: MOCK_ITEM_ID,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      expect(res).not.toContain('chat=');
    });

    it('build item path with chat closed', () => {
      const res = buildItemLinkForBuilder({
        origin: {
          hostName: MOCK_HOST,
          protocol: DEFAULT_PROTOCOL,
        },
        itemId: MOCK_ITEM_ID,
        chatOpen: false,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      // query string should contain "chat=false" to have the chat closed
      expect(res).toContain('chat=false');
    });

    it('build item path with chat open', () => {
      const res = buildItemLinkForBuilder({
        origin: {
          hostName: MOCK_HOST,
          protocol: DEFAULT_PROTOCOL,
        },
        itemId: MOCK_ITEM_ID,
        chatOpen: true,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      // query string should contain "chat=true" to have the chat open
      expect(res).toContain('chat=true');
    });

    it('build item path with protocol', () => {
      const res = buildItemLinkForBuilder({
        origin: {
          hostName: MOCK_HOST,
          protocol: DEFAULT_PROTOCOL,
        },
        itemId: MOCK_ITEM_ID,
      });
      expect(res).toContain(DEFAULT_PROTOCOL);
    });

    it('build item path with special protocol', () => {
      const specialProtocol = 'smb';
      const res = buildItemLinkForBuilder({
        origin: {
          hostName: MOCK_HOST,
          protocol: specialProtocol,
        },
        itemId: MOCK_ITEM_ID,
      });
      expect(res).toContain(specialProtocol);
      expect(res).not.toContain(DEFAULT_PROTOCOL);
    });

    it('build item path with string origin', () => {
      const res = buildItemLinkForBuilder({
        origin: MOCK_HOST_WITH_PROTOCOL,
        itemId: MOCK_ITEM_ID,
      });
      expect(res).toContain(MOCK_HOST_WITH_PROTOCOL);
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
