import { EmailFrequency, UUID } from '@/index';

export enum MemberType {
  Individual = 'individual',
  Group = 'group',
}

export interface MemberExtra {
  hasAvatar?: boolean;
  favoriteItems?: string[];
  lang?: string;
  enableSaveActions?: boolean;
  emailFreq?: `${EmailFrequency}` | EmailFrequency;
}

export interface Member {
  id: UUID;
  name: string;
  email: string;
  type: `${MemberType}` | MemberType;
  extra: MemberExtra;
  createdAt: Date;
  updatedAt: Date;
}
