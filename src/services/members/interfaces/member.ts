import { Actor } from '../../../interfaces/actor';

export enum MemberType {
  Individual = 'individual',
  Group = 'group',
}
export interface Member<E extends MemberExtra = MemberExtra> extends Actor {
  name: string;
  email: string;
  type: MemberType;
  extra: E;
  createdAt: string;
  updatedAt: string;
  password?: string;
}

export interface MemberExtra {
  hasAvatar?: boolean;
  favoriteItems?: string[];
  lang?: string;
  enableSaveActions?: boolean;
}
