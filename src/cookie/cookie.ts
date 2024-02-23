import * as jsCookies from 'js-cookie';

import { UUID } from '@/types.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { default: Cookies } = jsCookies;

const IFRAME_RESIZE_HEIGHT_COOKIE_EXPIRATION_DAYS = 365; // 365 days

export enum CookieKeys {
  AcceptCookies = 'acceptAllCookies',
  Session = 'session',
  RedirectUrl = 'redirectUrl',
  Lang = 'lang',
  IframeResizeHeight = 'iframeResizeHeight',
}

export const buildIframeResizeHeightKey = ({
  memberId,
  itemId,
}: {
  memberId?: UUID;
  itemId: UUID;
}): string =>
  `${CookieKeys.IframeResizeHeight}-${memberId ?? 'unknown'}-${itemId}`;

export const hasAcceptedCookies = (): boolean =>
  Cookies.get(CookieKeys.AcceptCookies) === 'true';

/**
 * @param  {string} link link to save for further redirection
 * @param  {string} domain value for the cookie's domain
 */
export const saveUrlForRedirection = (link: string, domain?: string) => {
  Cookies.set(CookieKeys.RedirectUrl, link, { domain, secure: true });
};

export const getUrlForRedirection = (): string | undefined =>
  Cookies.get(CookieKeys.RedirectUrl);

/**
 * @param  {string} lang user's lang
 * @param  {string} domain value for the cookie's domain
 */
export const setLangCookie = (lang: string, domain: string) =>
  Cookies.set(CookieKeys.Lang, lang, { domain });

/**
 * @returns  {string|undefined} user's lang
 */
export const getLangCookie = (): string | undefined =>
  Cookies.get(CookieKeys.Lang);

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

export const getIframeResizeHeightCookie = ({
  itemId,
  memberId,
}: {
  itemId: UUID;
  memberId?: UUID;
}) => Cookies.get(buildIframeResizeHeightKey({ memberId, itemId }));
