export interface AppIdentification {
  key: string;
}

export type AuthTokenSubject = {
  memberId: string;
  itemId: string;
  origin: string;
} & AppIdentification; // from the graasp client/app wrapper // from the app itself
