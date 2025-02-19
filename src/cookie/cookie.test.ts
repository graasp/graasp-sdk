// @vitest-environment jsdom
import Cookies from 'js-cookie';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  CookieKeys,
  buildIframeResizeHeightKey,
  getIframeResizeHeightCookie,
  getLangCookie,
  getUrlForRedirection,
  hasAcceptedCookies,
  saveUrlForRedirection,
  setIframeResizeHeightCookie,
  setLangCookie,
} from './cookie.js';

const MOCK_URL = 'https://example.com';
const MOCK_LANG = 'en';
const MOCK_DOMAIN = 'domain';

describe('Cookie Util Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
    Object.values(CookieKeys).forEach((key) => {
      Cookies.remove(key);
    });
  });

  describe('getIframeResizeHeightCookie', () => {
    const itemId = 'itemId';
    const memberId = 'memberId';
    const height = '230';
    it('get height successfully for memberId and itemId', () => {
      Cookies.set(buildIframeResizeHeightKey({ memberId, itemId }), height);
      const res = getIframeResizeHeightCookie({ itemId, memberId });
      expect(res).toEqual(height);
    });

    it('get height successfully for undefined memberId', () => {
      Cookies.set(buildIframeResizeHeightKey({ itemId }), height);
      const res = getIframeResizeHeightCookie({ itemId });
      expect(res).toEqual(height);
    });
  });

  describe('setIframeResizeHeightCookie', () => {
    const itemId = 'itemId';
    const memberId = 'memberId';
    const height = '230';
    it('set height successfully for memberId and itemId', () => {
      const key = buildIframeResizeHeightKey({ memberId, itemId });
      Cookies.set(key, height);
      setIframeResizeHeightCookie({ itemId, memberId }, height + 1);
      expect(Cookies.get(key)).toEqual(height + 1);
    });

    it('get height successfully for undefined memberId', () => {
      const key = buildIframeResizeHeightKey({ itemId });
      Cookies.set(key, height);
      setIframeResizeHeightCookie({ itemId }, height + 2);
      expect(Cookies.get(key)).toEqual(height + 2);
    });
  });

  describe('hasAcceptedCookies', () => {
    it('check successfully accepted cookies value for true value', () => {
      Cookies.set(CookieKeys.AcceptCookies, 'true');
      const res = hasAcceptedCookies();
      expect(res).toBeTruthy();
    });

    it('check successfully accepted cookies value for false value', () => {
      Cookies.set(CookieKeys.AcceptCookies, 'false');
      const res = hasAcceptedCookies();
      expect(res).toBeFalsy();
    });

    it('check successfully accepted cookies value for false value', () => {
      Cookies.set(CookieKeys.AcceptCookies, 'null');
      const res = hasAcceptedCookies();
      expect(res).toBeFalsy();
    });
  });

  describe('saveUrlForRedirection', () => {
    it('save link for redirection in cookie', () => {
      const mock = vi.spyOn(Cookies, 'set');
      saveUrlForRedirection(MOCK_URL, MOCK_DOMAIN);
      expect(mock).toHaveBeenCalledWith(CookieKeys.RedirectUrl, MOCK_URL, {
        domain: MOCK_DOMAIN,
        secure: true,
      });
    });
  });

  describe('getUrlForRedirection', () => {
    it('save link for redirection in cookie', () => {
      const getRedirectionCookieSpy = vi.spyOn(Cookies, 'get');
      Cookies.set(CookieKeys.RedirectUrl, MOCK_URL);
      getUrlForRedirection();
      expect(getRedirectionCookieSpy).toHaveBeenCalledWith(
        CookieKeys.RedirectUrl,
      );
    });
  });

  describe('getLangCookie', () => {
    it("get user's lang in cookie", () => {
      const getCookieSpy = vi.spyOn(Cookies, 'get');
      Cookies.set(CookieKeys.Lang, MOCK_LANG);
      getLangCookie();
      expect(getCookieSpy).toHaveBeenCalledWith(CookieKeys.Lang);
    });
  });

  describe('setLangCookie', () => {
    it("save user's lang in cookie", () => {
      const mock = vi.spyOn(Cookies, 'set');
      setLangCookie(MOCK_LANG, MOCK_DOMAIN);
      expect(mock).toHaveBeenCalledWith(CookieKeys.Lang, MOCK_LANG, {
        domain: MOCK_DOMAIN,
      });
    });
  });
});
