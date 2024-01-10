// @vitest-environment jsdom
import Cookies from 'js-cookie';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MOCK_DOMAIN, MOCK_LANG, MOCK_URL } from '../../test/fixtures';
import {
  COOKIE_KEYS,
  buildIframeResizeHeightKey,
  getIframeResizeHeightCookie,
  getLangCookie,
  getUrlForRedirection,
  hasAcceptedCookies,
  saveUrlForRedirection,
  setIframeResizeHeightCookie,
  setLangCookie,
} from './cookie';

describe('Cookie Util Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
    Object.values(COOKIE_KEYS).forEach((key) => {
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
      Cookies.set(COOKIE_KEYS.ACCEPT_COOKIES_KEY, 'true');
      const res = hasAcceptedCookies();
      expect(res).toBeTruthy();
    });

    it('check successfully accepted cookies value for false value', () => {
      Cookies.set(COOKIE_KEYS.ACCEPT_COOKIES_KEY, 'false');
      const res = hasAcceptedCookies();
      expect(res).toBeFalsy();
    });

    it('check successfully accepted cookies value for false value', () => {
      Cookies.set(COOKIE_KEYS.ACCEPT_COOKIES_KEY, 'null');
      const res = hasAcceptedCookies();
      expect(res).toBeFalsy();
    });
  });

  describe('saveUrlForRedirection', () => {
    it('save link for redirection in cookie', () => {
      const mock = vi.spyOn(Cookies, 'set');
      saveUrlForRedirection(MOCK_URL, MOCK_DOMAIN);
      expect(mock).toHaveBeenCalledWith(
        COOKIE_KEYS.REDIRECT_URL_KEY,
        MOCK_URL,
        { domain: MOCK_DOMAIN, secure: true },
      );
    });
  });

  describe('getUrlForRedirection', () => {
    it('save link for redirection in cookie', () => {
      const getRedirectionCookieSpy = vi.spyOn(Cookies, 'get');
      Cookies.set(COOKIE_KEYS.REDIRECT_URL_KEY, MOCK_URL);
      getUrlForRedirection();
      expect(getRedirectionCookieSpy).toHaveBeenCalledWith(
        COOKIE_KEYS.REDIRECT_URL_KEY,
      );
    });
  });

  describe('getLangCookie', () => {
    // eslint-disable-next-line quotes
    it("get user's lang in cookie", () => {
      const getCookieSpy = vi.spyOn(Cookies, 'get');
      Cookies.set(COOKIE_KEYS.LANG_KEY, MOCK_LANG);
      getLangCookie();
      expect(getCookieSpy).toHaveBeenCalledWith(COOKIE_KEYS.LANG_KEY);
    });
  });

  describe('setLangCookie', () => {
    // eslint-disable-next-line quotes
    it("save user's lang in cookie", () => {
      const mock = vi.spyOn(Cookies, 'set');
      setLangCookie(MOCK_LANG, MOCK_DOMAIN);
      expect(mock).toHaveBeenCalledWith(COOKIE_KEYS.LANG_KEY, MOCK_LANG, {
        domain: MOCK_DOMAIN,
      });
    });
  });
});
