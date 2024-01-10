import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  MOCK_HOST,
  MOCK_HOST_WITH_PROTOCOL,
  MOCK_ITEM_ID,
  MOCK_URL,
} from '../../test/fixtures';
import { DEFAULT_PROTOCOL } from '../config';
import * as cookieUtils from './cookie';
import {
  buildItemLinkForBuilder,
  buildPdfViewerLink,
  buildSignInPath,
  redirect,
  redirectToSavedUrl,
} from './navigation';

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
        'http://google.com',
      );
      redirectToSavedUrl(mockTarget);
      expect(mockTarget.location.assign.mock.calls[0]).toEqual([
        'http://google.com',
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
      const res = buildSignInPath({ host: MOCK_HOST });
      expect(res).toContain(MOCK_HOST);
    });
  });

  describe('buildItemLinkForBuilder LEGACY', () => {
    it('build item path without specifying chat status', () => {
      const res = buildItemLinkForBuilder({
        host: MOCK_HOST,
        itemId: MOCK_ITEM_ID,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      expect(res).not.toContain('chat=');
    });

    it('build item path with chat closed', () => {
      const res = buildItemLinkForBuilder({
        host: MOCK_HOST,
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
        host: MOCK_HOST,
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
        host: MOCK_HOST,
        itemId: MOCK_ITEM_ID,
      });
      expect(res).toContain(DEFAULT_PROTOCOL);
    });

    it('build item path with special protocol', () => {
      const specialProtocol = 'smb';
      const res = buildItemLinkForBuilder({
        protocol: specialProtocol,
        host: MOCK_HOST,
        itemId: MOCK_ITEM_ID,
      });
      expect(res).toContain(specialProtocol);
      expect(res).not.toContain(DEFAULT_PROTOCOL);
    });

    it('build item path with host containing protocol', () => {
      const res = buildItemLinkForBuilder({
        host: MOCK_HOST_WITH_PROTOCOL,
        itemId: MOCK_ITEM_ID,
      });
      expect(res).toContain(MOCK_HOST_WITH_PROTOCOL);
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
});
