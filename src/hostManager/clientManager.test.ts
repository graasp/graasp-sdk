import { v4 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { Context } from '@graasp/sdk';

import { ClientManager } from './clientManager.js';

const MOCK_HOST = 'https://localhost:1010/';
const MOCK_ITEM_ID = v4();
const manager = ClientManager.getInstance().setHost(new URL(MOCK_HOST));

describe('Client Host Manager', () => {
  it('Created the Host manager instance', () => {
    expect(ClientManager.getInstance()).toBeTruthy();
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
      const libraryHost = 'https://example.org/';
      manager.addHost(Context.Library, new URL(libraryHost));
      expect(manager.getLinkByContext(Context.Library)).toEqual(libraryHost);
      expect(manager.getLinkByContext(Context.Library, 'path')).toEqual(
        libraryHost + 'path',
      );
    });
  });

  describe('getItemLink', () => {
    it('build item path with chat open for builder', () => {
      const res = manager.getItemLink(Context.Builder, MOCK_ITEM_ID, {
        chatOpen: true,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      // query string should contain "chat=false" to have the chat closed
      expect(res).toContain('chatOpen=true');
    });
    it('build item path with chat closed for builder', () => {
      const res = manager.getItemLink(Context.Builder, MOCK_ITEM_ID, {
        chatOpen: false,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      // query string should contain "chat=false" to have the chat closed
      expect(res).toContain('chatOpen=false');
    });
    it('build item path with chat closed for player', () => {
      const res = manager.getItemLink(Context.Player, MOCK_ITEM_ID, {
        chatOpen: false,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      // query string should contain "chat=false" to have the chat closed
      expect(res).toContain('chatOpen=false');
    });
  });
});
