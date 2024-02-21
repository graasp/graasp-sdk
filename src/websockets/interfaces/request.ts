import { Member } from '@/member/member.js';

/**
 * Internal request type when clients attempt to subscribe to some channel
 * Allows consumers to operate on the subscription attempt in the server
 */
export interface SubscriptionRequest {
  /**
   * Subscription target channel name
   */
  channel: string;
  /**
   * Member requesting a subscription
   */
  member: Member;
  /**
   * Rejects the subscription request with a specified error
   */
  reject(error: Error): void;
}
