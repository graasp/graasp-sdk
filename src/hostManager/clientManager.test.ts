import { v4 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { Context } from '@graasp/sdk';

import { ClientManager } from './clientManager.js';

// TODO: add more tests
describe('Client Host Manager', () => {
  it('Created the Host manager instance', () => {
    expect(ClientManager.getInstance()).toBeTruthy();
  });

  it('Add query strings for context', () => {
    const manager = ClientManager.getInstance();
    manager.setHost(new URL('http://localhost.com'));
    manager.addItemPrefix(Context.Builder, '');
    expect(
      manager.getItemLink(Context.Builder, v4(), { mode: 'grid' }),
    ).toContain('grid');
  });

  // describe('buildItemLinkForBuilder', () => {
  //   it('build item path without specifying chat status', () => {
  //     const res = buildItemLinkForBuilder({
  //       origin: {
  //         hostName: MOCK_HOST,
  //         protocol: DEFAULT_PROTOCOL,
  //       },
  //       itemId: MOCK_ITEM_ID,
  //     });
  //     expect(res).toContain(MOCK_HOST);
  //     expect(res).toContain(MOCK_ITEM_ID);
  //     expect(res).not.toContain('chat=');
  //   });

  //   it('build item path with chat closed', () => {
  //     const res = buildItemLinkForBuilder({
  //       origin: {
  //         hostName: MOCK_HOST,
  //         protocol: DEFAULT_PROTOCOL,
  //       },
  //       itemId: MOCK_ITEM_ID,
  //       chatOpen: false,
  //     });
  //     expect(res).toContain(MOCK_HOST);
  //     expect(res).toContain(MOCK_ITEM_ID);
  //     // query string should contain "chat=false" to have the chat closed
  //     expect(res).toContain('chat=false');
  //   });

  //   it('build item path with chat open', () => {
  //     const res = buildItemLinkForBuilder({
  //       origin: {
  //         hostName: MOCK_HOST,
  //         protocol: DEFAULT_PROTOCOL,
  //       },
  //       itemId: MOCK_ITEM_ID,
  //       chatOpen: true,
  //     });
  //     expect(res).toContain(MOCK_HOST);
  //     expect(res).toContain(MOCK_ITEM_ID);
  //     // query string should contain "chat=true" to have the chat open
  //     expect(res).toContain('chat=true');
  //   });

  //   it('build item path with protocol', () => {
  //     const res = buildItemLinkForBuilder({
  //       origin: {
  //         hostName: MOCK_HOST,
  //         protocol: DEFAULT_PROTOCOL,
  //       },
  //       itemId: MOCK_ITEM_ID,
  //     });
  //     expect(res).toContain(DEFAULT_PROTOCOL);
  //   });

  //   it('build item path with special protocol', () => {
  //     const specialProtocol = 'smb';
  //     const res = buildItemLinkForBuilder({
  //       origin: {
  //         hostName: MOCK_HOST,
  //         protocol: specialProtocol,
  //       },
  //       itemId: MOCK_ITEM_ID,
  //     });
  //     expect(res).toContain(specialProtocol);
  //     expect(res).not.toContain(DEFAULT_PROTOCOL);
  //   });

  //   it('build item path with string origin', () => {
  //     const res = buildItemLinkForBuilder({
  //       origin: MOCK_HOST_WITH_PROTOCOL,
  //       itemId: MOCK_ITEM_ID,
  //     });
  //     expect(res).toContain(MOCK_HOST_WITH_PROTOCOL);
  //   });
  // });

  // describe('buildSignInPath', () => {
  //   it('build sign in path', () => {
  //     const res = buildSignInPath({ host: MOCK_HOST_WITH_PROTOCOL });
  //     expect(res).toContain(MOCK_HOST_WITH_PROTOCOL);
  //   });
  //   it('build sign in path with redirection url', () => {
  //     const redirectionUrl = 'https://test.com';
  //     const res = buildSignInPath({
  //       host: MOCK_HOST_WITH_PROTOCOL,
  //       redirectionUrl,
  //     });
  //     expect(res).toContain(MOCK_HOST_WITH_PROTOCOL);
  //     expect(res).toContain(`?url=${encodeURIComponent(redirectionUrl)}`);
  //   });
  //   it('build sign in path with lang parameter', () => {
  //     const res = buildSignInPath({
  //       host: MOCK_HOST_WITH_PROTOCOL,
  //       lang: 'ru',
  //     });
  //     expect(res).toContain(MOCK_HOST_WITH_PROTOCOL);
  //     expect(res).toContain('?lang=ru');
  //   });
  // });
});
