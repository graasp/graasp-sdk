import Cookies from 'js-cookie';
import { UUID } from 'src/types';

import {
  IFRAME_RESIZE_HEIGHT_COOKIE_EXPIRATION_DAYS,
  SESSION_COOKIE_EXPIRATION_DURATION_MS,
} from '../constants/constants';

export interface Session {
  id: string;
  token: string;
  createdAt: number;
}

// todo: use enum once frontend interfaces are in ts
export const COOKIE_KEYS = {
  ACCEPT_COOKIES_KEY: 'acceptAllCookies',
  SESSION_KEY: 'session',
  STORED_SESSIONS_KEY: 'storedSessions',
  REDIRECT_URL_KEY: 'redirectUrl',
  LANG_KEY: 'lang',
  IFRAME_RESIZE_HEIGHT_KEY: 'iframeResizeHeight',
};

/**
 * @returns {string} IframeResizeHeightCookie key
 * @param {UUID} memeber id
 * * @param {UUID} item id
 */
export const buildIframeResizeHeightKey = ({
  memberId,
  itemId,
}: {
  memberId?: UUID;
  itemId: UUID;
}) =>
  `${COOKIE_KEYS.IFRAME_RESIZE_HEIGHT_KEY}-${memberId ?? 'unknown'}-${itemId}`;

/**
 * @returns {boolean} whether the user accepted the cookies
 */
export const hasAcceptedCookies = () =>
  Cookies.get(COOKIE_KEYS.ACCEPT_COOKIES_KEY) === 'true';

// TODO: this function should change to rely on another cookie -> session will be httpOnly
/**
 * @returns {boolean} whether the user is authenticated
 */
export const isUserAuthenticated = () =>
  Boolean(Cookies.get(COOKIE_KEYS.SESSION_KEY));

/**
 * @param {string|null} token value to set in the session key. A null value will remove it.
 * @param  {string} domain value for the cookie's domain
 */
export const setCurrentSession = (token: string | null, domain: string) => {
  if (!token) {
    return Cookies.remove(COOKIE_KEYS.SESSION_KEY, { domain, secure: true });
  }
  return Cookies.set(COOKIE_KEYS.SESSION_KEY, token, { domain, secure: true });
};
/**
 * @returns {string|undefined} current session token
 */
export const getCurrentSession = () => Cookies.get(COOKIE_KEYS.SESSION_KEY);

/**
 * @returnss {Session[]} stored sessions
 */
export const getStoredSessions = (): Session[] => {
  try {
    const storedSessions = JSON.parse(
      Cookies.get(COOKIE_KEYS.STORED_SESSIONS_KEY) ?? '[]',
    );

    // validate value is an array
    if (!Array.isArray(storedSessions)) {
      return [];
    }

    return storedSessions;
  } catch (e) {
    return [];
  }
};

/**
 * @param  {Session} session value to store
 * @param  {string} domain value for the cookie's domain
 */
export const storeSession = (session: Session, domain: string) => {
  const sessions = getStoredSessions();

  const storedSessionIdx = sessions.findIndex(({ id }) => id === session.id);
  // add session if doesn't exist
  if (storedSessionIdx < 0) {
    sessions.push(session);
  }
  // replace corresponding session with new values (date, token)
  else {
    sessions[storedSessionIdx] = session;
  }

  Cookies.set(COOKIE_KEYS.STORED_SESSIONS_KEY, JSON.stringify(sessions), {
    domain,
    secure: true,
  });
};
/**
 * @param  {string} sId session id to remove
 * @param  {string} domain value for the cookie's domain
 */
export const removeSession = (sId: string, domain: string) => {
  const sessions = getStoredSessions();

  // remove session
  Cookies.set(
    COOKIE_KEYS.STORED_SESSIONS_KEY,
    JSON.stringify(sessions.filter(({ id }) => sId !== id)),
    { domain, secure: true },
  );
};
/**
 * @param  {string} sId session id to remove
 * @returns  {boolean} whether the session is expired, true if no session found
 */
export const isSessionExpired = (sId: string) => {
  const sessions = getStoredSessions();

  const session = sessions.find(({ id }) => id === sId);
  if (!session) {
    return true;
  }
  return Boolean(
    session.createdAt + SESSION_COOKIE_EXPIRATION_DURATION_MS < Date.now(),
  );
};

/**
 * @param  {string} link link to save for further redirection
 * @param  {string} domain value for the cookie's domain
 */
export const saveUrlForRedirection = (link: string, domain: string) => {
  Cookies.set(COOKIE_KEYS.REDIRECT_URL_KEY, link, { domain, secure: true });
};

/**
 * @returns  {string|undefined} link saved for further redirection
 */
export const getUrlForRedirection = () =>
  Cookies.get(COOKIE_KEYS.REDIRECT_URL_KEY);

/**
 * @param  {string} lang user's lang
 * @param  {string} domain value for the cookie's domain
 */
export const setLangCookie = (lang: string, domain: string) =>
  Cookies.set(COOKIE_KEYS.LANG_KEY, lang, { domain });

/**
 * @returns  {string|undefined} user's lang
 */
export const getLangCookie = () => Cookies.get(COOKIE_KEYS.LANG_KEY);

/**
 * @param  {string} memberId
 * @param  {string} itemId
 * @param  {number} variable height to set in the cookie
 */
export const setIframeResizeHeightCookie = (
  {
    itemId,

    memberId,
  }: {
    itemId: UUID;
    memberId?: UUID;
  },
  height: string | number,
) =>
  Cookies.set(
    buildIframeResizeHeightKey({ memberId, itemId }),
    String(height),
    {
      expires: IFRAME_RESIZE_HEIGHT_COOKIE_EXPIRATION_DAYS,
    },
  );

/**
 * @returns  {string|undefined} iframe height
 * @param {UUID} memeber id
 * @param {UUID} item id
 */
export const getIframeResizeHeightCookie = ({
  itemId,
  memberId,
}: {
  itemId: UUID;
  memberId?: UUID;
}) => Cookies.get(buildIframeResizeHeightKey({ memberId, itemId }));
