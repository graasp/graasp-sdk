import Cookies from 'js-cookie';

import { IFRAME_RESIZE_HEIGHT_COOKIE_EXPIRATION_DAYS } from '../constants/constants';
import { UUID } from '@/types';

export interface Session {
  id: string;
  token: string;
  createdAt: number;
}

// todo: use enum once frontend interfaces are in ts
export const COOKIE_KEYS = {
  ACCEPT_COOKIES_KEY: 'acceptAllCookies',
  SESSION_KEY: 'session',
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
