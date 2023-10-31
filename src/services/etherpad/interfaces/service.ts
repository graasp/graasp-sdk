import { default as EtherpadApi } from '@graasp/etherpad-api';

import { EtherpadItemExtra } from './etherpad';
import { Item, Member } from '@/index';

export type EtherpadCookie = {
  name: string;
  value: string;
  options: {
    domain: string;
    path: string;
    expires: string;
    signed: boolean;
    httpOnly: boolean;
  };
};

export interface EtherpadService {
  createEtherpadItem(
    name: string,
    member: Member,
    parentId?: string,
    initHtml?: string,
  ): Promise<Item<EtherpadItemExtra>>;

  getEtherpadFromItem(
    itemId: string,
    member: Member,
    mode: 'read' | 'write',
  ): Promise<{ padUrl: string; cookie: EtherpadCookie }>;

  deleteEtherpadForItem(
    item: Partial<Item<EtherpadItemExtra>>,
    actor: Pick<Member, 'id'>,
  ): Promise<void>;

  copyEtherpadInMutableItem(
    mutableItem: Partial<Item<EtherpadItemExtra>>,
    actor: Pick<Member, 'id'>,
  ): Promise<void>;

  buildPadID({
    groupID,
    padName,
  }: {
    groupID: string;
    padName: string;
  }): string;

  buildPadPath(args: { padID: string }, baseUrl?: string): string;

  buildEtherpadExtra(args: {
    groupID: string;
    padName: string;
  }): EtherpadItemExtra;

  api: EtherpadApi;
}
