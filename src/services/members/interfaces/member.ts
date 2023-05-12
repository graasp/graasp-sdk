import { Actor, UUID, UnknownExtra } from '@/index';

export enum MemberType {
  Individual = 'individual',
  Group = 'group',
}

export interface MemberExtra extends UnknownExtra {
  hasAvatar?: boolean;
  favoriteItems?: string[];
  lang?: string;
  enableSaveActions?: boolean;
}

export interface Member<E extends UnknownExtra = MemberExtra> extends Actor {
  id: UUID;
  name: string;
  email: string;
  type: MemberType;
  extra: E;
  createdAt: Date;
  updatedAt: Date;
}
