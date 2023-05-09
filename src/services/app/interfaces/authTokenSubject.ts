import { Item, Member } from '@/services';

export interface AppIdentification {
  key: string;
}

export type AuthTokenSubject = {
  memberId?: Member['id'];
  itemId: Item['id'];
  origin: string;
} & AppIdentification; // from the graasp client/app wrapper // from the app itself
