import { v4 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { ClientManager } from './clientManager.js';
import { Context } from '@/enums/context.js';

const MOCK_HOST = 'https://localhost:1010/';
const MOCK_ITEM_ID = v4();
const manager = ClientManager.getInstance().setHost(MOCK_HOST);

// setup library host once
const libraryHost = 'https://example.org/';
manager.addHost(Context.Library, libraryHost);

describe('Client Host Manager', () => {
  it('Created the Host manager instance', () => {
    expect(ClientManager.getInstance()).toBeTruthy();
  });

  it('setHost throws for invalid host string', () => {
    expect(() => ClientManager.getInstance().setHost('invalid')).toThrowError();
  });

  it('addHost throws for invalid host string', () => {
    expect(() =>
      ClientManager.getInstance().addHost(Context.Auth, 'invalid'),
    ).toThrowError();
  });

  describe('getLinkByContext', () => {
    it('build link for builder', () => {
      expect(manager.getLinkByContext(Context.Builder)).toEqual(
        MOCK_HOST + 'builder/',
      );
      expect(manager.getLinkByContext(Context.Builder, 'path')).toEqual(
        MOCK_HOST + 'builder/path',
      );
    });
    it('build link for player', () => {
      expect(manager.getLinkByContext(Context.Player)).toEqual(
        MOCK_HOST + 'player/',
      );
      expect(manager.getLinkByContext(Context.Player, 'path')).toEqual(
        MOCK_HOST + 'player/path',
      );
    });
    it('build link for auth', () => {
      expect(manager.getLinkByContext(Context.Auth)).toEqual(
        MOCK_HOST + 'auth/',
      );
      expect(manager.getLinkByContext(Context.Auth, 'path')).toEqual(
        MOCK_HOST + 'auth/path',
      );
      expect(
        manager.getLinkByContext(Context.Auth, 'path', {
          redirectUrl: 'redirectUrl',
        }),
      ).toEqual(MOCK_HOST + 'auth/path?redirectUrl=redirectUrl');
    });
    it('build sign in link with lang url', () => {
      expect(
        manager.getLinkByContext(Context.Auth, 'login', {
          lang: 'fr',
        }),
      ).toEqual(MOCK_HOST + 'auth/login?lang=fr');
    });
    it('build link for account', () => {
      expect(manager.getLinkByContext(Context.Account)).toEqual(
        MOCK_HOST + 'account/',
      );
      expect(manager.getLinkByContext(Context.Account, 'path')).toEqual(
        MOCK_HOST + 'account/path',
      );
    });
    it('build link for library', () => {
      expect(manager.getLinkByContext(Context.Library)).toEqual(libraryHost);
      expect(manager.getLinkByContext(Context.Library, 'path')).toEqual(
        libraryHost + 'path',
      );
    });
  });

  describe('getURLByContext', () => {
    it('build link for builder', () => {
      const url = manager.getURLByContext(Context.Builder);
      expect(url.toString()).toEqual(MOCK_HOST + 'builder/');
      expect(MOCK_HOST).toContain(url.origin);

      const url1 = manager.getURLByContext(Context.Builder, 'path');
      expect(url1.toString()).toEqual(MOCK_HOST + 'builder/path');
      expect(MOCK_HOST).toContain(url1.origin);
    });
    it('build link for library', () => {
      const url = manager.getURLByContext(Context.Library);
      expect(url.toString()).toEqual(libraryHost);
      expect(libraryHost).toContain(url.origin);
      const url1 = manager.getURLByContext(Context.Library, 'path');
      expect(url1.toString()).toEqual(libraryHost + 'path');
      expect(libraryHost).toContain(url1.origin);
    });
  });

  describe('getItemLink', () => {
    it('build item path with chat open for builder', () => {
      const res = manager.getItemLink(Context.Builder, MOCK_ITEM_ID, {
        chatOpen: true,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      expect(res).toContain('builder/');
      // query string should contain "chat=false" to have the chat closed
      expect(res).toContain('chatOpen=true');
    });
    it('build item path with chat closed for builder', () => {
      const res = manager.getItemLink(Context.Builder, MOCK_ITEM_ID, {
        chatOpen: false,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      expect(res).toContain('builder/');
      // query string should contain "chat=false" to have the chat closed
      expect(res).toContain('chatOpen=false');
    });
    it('build item path with chat closed for player', () => {
      const res = manager.getItemLink(Context.Player, MOCK_ITEM_ID, {
        chatOpen: false,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      expect(res).toContain('player/');
      // query string should contain "chat=false" to have the chat closed
      expect(res).toContain('chatOpen=false');
    });
  });

  describe('getContextByLink', () => {
    it('get builder', () => {
      const res = manager.getContextByLink('https://graasp.org/builder');
      expect(res).toEqual(Context.Builder);
    });
    it('get player', () => {
      const res = manager.getContextByLink('https://graasp.org/player');
      expect(res).toEqual(Context.Player);
    });
    it('get account', () => {
      const res = manager.getContextByLink('https://graasp.org/account');
      expect(res).toEqual(Context.Account);
    });
    it('get analytics', () => {
      const res = manager.getContextByLink('https://graasp.org/analytics');
      expect(res).toEqual(Context.Analytics);
    });
    it('get auth', () => {
      const res = manager.getContextByLink('https://graasp.org/auth');
      expect(res).toEqual(Context.Auth);
    });
    it('get library', () => {
      const res = manager.getContextByLink(libraryHost + 'collections/id');
      expect(res).toEqual(Context.Library);
    });
    it('get unknown for wrong link', () => {
      const res = manager.getContextByLink('anything');
      expect(res).toEqual(Context.Unknown);
    });
  });
});
