import { Actor, Item, Member, Task } from '@/index';

export interface PublishItemTaskManager {
  /**
   * Get the name of the publish item task name
   */
  getPublishItemTaskName(): string;

  /**
   * Factory of tasks to create a publish item task sequence
   */
  createPublishItemTaskSequence(
    member: Member,
    item: Item,
  ): Task<Actor, unknown>[];
}
