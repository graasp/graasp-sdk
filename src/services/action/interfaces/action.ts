import { Serializable } from '../../../interfaces';

export interface Action {
  id: string;
  memberId: string;
  itemPath: string;
  memberType: string;
  itemType: string;
  actionType: string;
  view: string;
  extra: Serializable;
  // createdAt: string;
  geolocation?: Serializable;
}
