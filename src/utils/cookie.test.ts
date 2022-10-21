import Cookies from 'js-cookie';

import {
  MOCK_DOMAIN,
  MOCK_LANG,
  MOCK_SESSIONS,
  MOCK_URL,
} from '../../test/fixtures';
import { SESSION_COOKIE_EXPIRATION_DURATION_MS } from '../constants/constants';
import * as cookieUtils from './cookie';

const {
  buildIframeResizeHeightKey,
  COOKIE_KEYS,
  getCurrentSession,
  getIframeResizeHeightCookie,
  getLangCookie,
  getStoredSessions,
  hasAcceptedCookies,
  isSessionExpired,
  isUserAuthenticated,
  removeSession,
  saveUrlForRedirection,
  setCurrentSession,
  setIframeResizeHeightCookie,
  setLangCookie,
  storeSession,
} = cookieUtils;

describe('Cookie Util Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  describe('isUserAuthenticated', () => {
    const value = 'session-value';
    it('check session value returns true', () => {
      Cookies.set(COOKIE_KEYS.SESSION_KEY, value);
      const res = isUserAuthenticated();
      expect(res).toBeTruthy();
    });

    it('check empty session value returns false', () => {
      const res = isUserAuthenticated();
      expect(res).toBeFalsy();
    });
  });

  describe('setCurrentSession', () => {
    const mockToken = 'mockToken';
    it('set given token to the current session cookie', () => {
      const mock = jest.spyOn(Cookies, 'set');
      setCurrentSession(mockToken, MOCK_DOMAIN);
      expect(mock).toBeCalledWith(COOKIE_KEYS.SESSION_KEY, mockToken, {
        domain: MOCK_DOMAIN,
        secure: true,
      });
    });

    it('remove token if given token is null', () => {
      const mock = jest.spyOn(Cookies, 'remove');
      setCurrentSession(null, MOCK_DOMAIN);
      expect(mock).toBeCalledWith(COOKIE_KEYS.SESSION_KEY, expect.anything());
    });
  });

  describe('getCurrentSession', () => {
    it('check successfully session token value', () => {
      Cookies.set(COOKIE_KEYS.SESSION_KEY, 'value');
      const res = getCurrentSession();
      expect(res).toEqual('value');
    });
  });

  describe('getStoredSessions', () => {
    it('get successfully stored sessions', () => {
      Cookies.set(
        COOKIE_KEYS.STORED_SESSIONS_KEY,
        JSON.stringify(MOCK_SESSIONS),
      );
      const res = getStoredSessions();
      expect(res).toEqual(MOCK_SESSIONS);
    });

    it('return empty array if stored sessions cookie is empty', () => {
      const res = getStoredSessions();
      expect(res).toEqual([]);
    });

    it('return empty array if stored sessions value is corrupted', () => {
      Cookies.set(COOKIE_KEYS.STORED_SESSIONS_KEY, 'weifojkn');
      const res = getStoredSessions();
      expect(res).toEqual([]);
    });
  });

  describe('storeSession', () => {
    it('add new session to stored session', () => {
      jest
        .spyOn(cookieUtils, 'getStoredSessions')
        .mockReturnValue([MOCK_SESSIONS[0]]);
      const mock = jest.spyOn(Cookies, 'set');
      storeSession(MOCK_SESSIONS[1], MOCK_DOMAIN);
      expect(mock).toHaveBeenCalledWith(
        COOKIE_KEYS.STORED_SESSIONS_KEY,
        JSON.stringify(MOCK_SESSIONS),
        { domain: MOCK_DOMAIN, secure: true },
      );
    });

    it('update existing session in stored session', () => {
      const updatedSession = { ...MOCK_SESSIONS[1], token: 'newToken' };
      const result = [MOCK_SESSIONS[0], updatedSession];
      jest
        .spyOn(cookieUtils, 'getStoredSessions')
        .mockReturnValue(MOCK_SESSIONS);
      const mock = jest.spyOn(Cookies, 'set');
      storeSession(updatedSession, MOCK_DOMAIN);
      expect(mock).toHaveBeenCalledWith(
        COOKIE_KEYS.STORED_SESSIONS_KEY,
        JSON.stringify(result),
        { domain: MOCK_DOMAIN, secure: true },
      );
    });
  });

  describe('removeSession', () => {
    it('remove successfully first stored session', () => {
      jest
        .spyOn(cookieUtils, 'getStoredSessions')
        .mockReturnValue(MOCK_SESSIONS);
      const mock = jest.spyOn(Cookies, 'set');
      removeSession(MOCK_SESSIONS[0].id, MOCK_DOMAIN);
      expect(mock).toHaveBeenCalledWith(
        COOKIE_KEYS.STORED_SESSIONS_KEY,
        JSON.stringify([MOCK_SESSIONS[1]]),
        { domain: MOCK_DOMAIN, secure: true },
      );
    });

    it('remove successfully second stored session', () => {
      jest
        .spyOn(cookieUtils, 'getStoredSessions')
        .mockReturnValue(MOCK_SESSIONS);
      const mock = jest.spyOn(Cookies, 'set');
      removeSession(MOCK_SESSIONS[1].id, MOCK_DOMAIN);
      expect(mock).toHaveBeenCalledWith(
        COOKIE_KEYS.STORED_SESSIONS_KEY,
        JSON.stringify([MOCK_SESSIONS[0]]),
        { domain: MOCK_DOMAIN, secure: true },
      );
    });

    it('does not remove if id is not found', () => {
      jest
        .spyOn(cookieUtils, 'getStoredSessions')
        .mockReturnValue(MOCK_SESSIONS);
      const mock = jest.spyOn(Cookies, 'set');
      removeSession('someid', MOCK_DOMAIN);
      expect(mock).toHaveBeenCalledWith(
        COOKIE_KEYS.STORED_SESSIONS_KEY,
        JSON.stringify(MOCK_SESSIONS),
        { domain: MOCK_DOMAIN, secure: true },
      );
    });
  });

  describe('isSessionExpired', () => {
    it('return true for expired session', () => {
      const expiredSession = {
        token: 'token',
        id: 'id',
        createdAt: Date.now() - SESSION_COOKIE_EXPIRATION_DURATION_MS - 10,
      };
      jest
        .spyOn(cookieUtils, 'getStoredSessions')
        .mockReturnValue([MOCK_SESSIONS[0], expiredSession]);
      const result = isSessionExpired(expiredSession.id);
      expect(result).toBeTruthy();
    });

    it('return false for valid session', () => {
      jest
        .spyOn(cookieUtils, 'getStoredSessions')
        .mockReturnValue(MOCK_SESSIONS);
      const result = isSessionExpired(MOCK_SESSIONS[0].id);
      expect(result).toBeFalsy();
    });

    it('return true for not found session', () => {
      jest
        .spyOn(cookieUtils, 'getStoredSessions')
        .mockReturnValue(MOCK_SESSIONS);
      const result = isSessionExpired('random-id');
      expect(result).toBeTruthy();
    });
  });

  describe('saveUrlForRedirection', () => {
    it('save link for redirection in cookie', () => {
      const mock = jest.spyOn(Cookies, 'set');
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
      Cookies.set(COOKIE_KEYS.REDIRECT_URL_KEY, MOCK_URL);
      const res = cookieUtils.getUrlForRedirection();
      expect(res).toEqual(MOCK_URL);
    });
  });

  describe('getLangCookie', () => {
    // eslint-disable-next-line quotes
    it("get user's lang in cookie", () => {
      Cookies.set(COOKIE_KEYS.LANG_KEY, MOCK_LANG);
      const res = getLangCookie();
      expect(res).toEqual(MOCK_LANG);
    });
  });

  describe('setLangCookie', () => {
    // eslint-disable-next-line quotes
    it("save user's lang in cookie", () => {
      const mock = jest.spyOn(Cookies, 'set');
      setLangCookie(MOCK_LANG, MOCK_DOMAIN);
      expect(mock).toHaveBeenCalledWith(COOKIE_KEYS.LANG_KEY, MOCK_LANG, {
        domain: MOCK_DOMAIN,
      });
    });
  });
});
