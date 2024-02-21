import { describe, expect, it } from 'vitest';

import { appendPathToUrl, appendQueryParamToUrl } from './url.js';

describe('URL utils', () => {
  describe('Append path name to url', () => {
    const ORIGIN = 'http://localhost:3001';
    const PATH_NAME = '/path';
    const ADDITIONAL_PATH_NAME = 'test';
    const ORIGIN_WITH_TRAIL = `${ORIGIN}/`;
    const URL_NO_TRAIL = `${ORIGIN}${PATH_NAME}`;
    const URL_WITH_TRAIL = `${URL_NO_TRAIL}/`;
    const URL_WITH_ADDITIONAL_PATH = `${URL_WITH_TRAIL}${ADDITIONAL_PATH_NAME}`;
    const ORIGIN_WITH_ADDITIONAL_PATH = `${ORIGIN_WITH_TRAIL}${ADDITIONAL_PATH_NAME}`;

    describe('With standard URL object', () => {
      it('Append correctly if origin ends with a trail', () => {
        const url = new URL(ADDITIONAL_PATH_NAME, ORIGIN_WITH_TRAIL);
        expect(url.toString()).toEqual(ORIGIN_WITH_ADDITIONAL_PATH);
      });
      it('Append correctly if origin not ending with a trail', () => {
        const url = new URL(ADDITIONAL_PATH_NAME, ORIGIN);
        expect(url.toString()).toEqual(ORIGIN_WITH_ADDITIONAL_PATH);
      });
      it('Append correctly if ending with a trail', () => {
        const url = new URL(ADDITIONAL_PATH_NAME, URL_WITH_TRAIL);
        expect(url.toString()).toEqual(URL_WITH_ADDITIONAL_PATH);
      });
      it('Append incorrectly by replacing last path when not ending with a trail', () => {
        const url = new URL(ADDITIONAL_PATH_NAME, URL_NO_TRAIL);
        const incorrectly_appended_url = `${ORIGIN}/${ADDITIONAL_PATH_NAME}`;
        expect(url.toString()).toEqual(incorrectly_appended_url);
      });
    });

    describe('With appendPathToUrl function', () => {
      it('Append correctly if origin ends with a trail', () => {
        const url = appendPathToUrl({
          pathname: ADDITIONAL_PATH_NAME,
          baseURL: ORIGIN_WITH_TRAIL,
        });
        expect(url.toString()).toEqual(ORIGIN_WITH_ADDITIONAL_PATH);
      });
      it('Append correctly if origin not ending with a trail', () => {
        const url = appendPathToUrl({
          pathname: ADDITIONAL_PATH_NAME,
          baseURL: ORIGIN,
        });
        expect(url.toString()).toEqual(ORIGIN_WITH_ADDITIONAL_PATH);
      });
      it('Append correctly if ending with a trail', () => {
        const url = appendPathToUrl({
          pathname: ADDITIONAL_PATH_NAME,
          baseURL: URL_WITH_TRAIL,
        });
        expect(url.toString()).toEqual(URL_WITH_ADDITIONAL_PATH);
      });
      it('Append correctly when not ending with a trail', () => {
        const url = appendPathToUrl({
          pathname: ADDITIONAL_PATH_NAME,
          baseURL: URL_NO_TRAIL,
        });
        expect(url.toString()).toEqual(URL_WITH_ADDITIONAL_PATH);
      });
      it('Append correctly when pathname starts with a trail', () => {
        const url = appendPathToUrl({
          pathname: `/${ADDITIONAL_PATH_NAME}`,
          baseURL: URL_NO_TRAIL,
        });
        expect(url.toString()).toEqual(URL_WITH_ADDITIONAL_PATH);
      });
    });
  });

  describe('appendQueryParamToUrl', () => {
    it('return same url when params is empty', () => {
      const initialUrl = 'http://localhost:3000/index.html';
      const res = appendQueryParamToUrl(initialUrl, {});
      expect(res).toEqual(initialUrl);
    });

    it('add params to url', () => {
      const initialUrl = 'http://localhost:3000/index.html';
      const res = appendQueryParamToUrl(initialUrl, { lang: 'en' });
      expect(res).toEqual('http://localhost:3000/index.html?lang=en');
    });

    it('add params to url without overriding', () => {
      const initialUrl = 'http://localhost:3000/index.html?lang=en';
      const res = appendQueryParamToUrl(initialUrl, { lang: 'de' });
      expect(res).toEqual('http://localhost:3000/index.html?lang=en&lang=de');
    });

    it('override params in url', () => {
      const initialUrl = 'http://localhost:3000/index.html?lang=en&test=bobo';
      const res = appendQueryParamToUrl(initialUrl, { lang: 'de' }, true);
      expect(res).toEqual('http://localhost:3000/index.html?lang=de&test=bobo');
    });
  });
});
