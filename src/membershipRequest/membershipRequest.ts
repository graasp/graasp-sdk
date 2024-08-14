import { Item } from '@/item/baseItem.js';
import { Member } from '@/member/member.js';

export enum MembershipRequestStatus {
  NotSubmittedOrDeleted = 'notSubmittedOrDeleted',
  Pending = 'pending',
  Approved = 'approved',
}

export type SimpleMembershipRequest = {
  member: Member;
  createdAt: string;
};

export type CompleteMembershipRequest = SimpleMembershipRequest & {
  item: Item;
};
