import { default as EtherpadApi } from '@graasp/etherpad-api';

import { EtherpadItemExtra } from './etherpad';
import { Actor, Item, Member } from '@/index';

export type EtherpadCookie = {
  name: string;
  value: string;
  options: {
    domain: string;
    path: string;
    expires: Date;
    signed: boolean;
    httpOnly: boolean;
  };
};

export interface EtherpadService {
  createEtherpadItem(
    name: string,
    member: Member,
    parentId?: string,
  ): Promise<Item<EtherpadItemExtra>>;

  getEtherpadFromItem(
    itemId: string,
    member: Member,
    mode: 'read' | 'write',
  ): Promise<{ padUrl: string; cookie: EtherpadCookie }>;

  deleteEtherpadForItem(
    item: Partial<Item<EtherpadItemExtra>>,
    actor: Actor,
  ): Promise<void>;

  copyEtherpadInMutableItem(
    mutableItem: Partial<Item<EtherpadItemExtra>>,
    actor: Actor,
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
