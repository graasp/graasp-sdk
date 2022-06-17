import * as cookieUtils from './cookie';
import Cookies from 'js-cookie';
import { SESSION_COOKIE_EXPIRATION_DURATION_MS } from '../constants/constants';
import { MOCK_DOMAIN, MOCK_SESSIONS, MOCK_URL } from '../../test/fixtures';

const {
  COOKIE_KEYS,
  saveUrlForRedirection,
  hasAcceptedCookies,
  setCurrentSession,
  getCurrentSession,
  getStoredSessions,
  storeSession,
  isSessionExpired,
  removeSession,
} = cookieUtils;

describe('Cookie Util Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.values(COOKIE_KEYS).forEach((key) => {
      Cookies.remove(key);
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
});
