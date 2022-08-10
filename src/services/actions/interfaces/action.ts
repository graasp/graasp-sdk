import { Serializable } from '../../../interfaces';

export interface Action {
  actionType: string;
  createdAt: string;
  extra: Serializable;
  geolocation?: Serializable;
  id: string;
  itemPath?: string;
  itemType?: string;
  memberId: string;
  memberType: string;
  view: string;
}
