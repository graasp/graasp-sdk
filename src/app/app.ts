import { Publisher } from './publisher.js';
import { DiscriminatedItem } from '@/item/item.js';
import { Account, Member } from '@/member/member.js';
import { UUID } from '@/types.js';

export type AppExtra = {
  image?: string;
};

export interface App {
  id: UUID;
  key: string;
  name: string;
  description: string;
  url: string;
  extra: AppExtra;
  publisher: Publisher;
  createdAt: string;
  updatedAt: string;
}

export interface AppIdentification {
  key: string;
}

export type AuthTokenSubject = {
  accountId?: Account['id'];
  itemId: DiscriminatedItem['id'];
  origin: string;
} & AppIdentification; // from the graasp client/app wrapper // from the app itself

type Data = { [key: string]: unknown };

export type AppAction<T extends Data = Data> = {
  id: string;
  item: DiscriminatedItem;
  account: Account;
  type: string;
  data: T;
  createdAt: string;
};

export enum AppDataVisibility {
  Item = 'item',
  Member = 'member',
}

export type AppData<T extends Data = Data> = {
  id: string;
  item: DiscriminatedItem;
  creator: Member | null;
  account: Account;
  type: string;
  visibility: `${AppDataVisibility}` | AppDataVisibility;
  data: T;
  createdAt: string;
  updatedAt: string;
};

export type AppSetting<T extends Data = Data> = {
  id: UUID;
  item: DiscriminatedItem;
  creator?: Member | null;
  name: string;
  data: T;
  createdAt: string;
  updatedAt: string;
};
