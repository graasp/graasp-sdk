import { ReadStream } from 'fs';

import { Actor } from '../../../interfaces/actor';
import { Task } from '../../../interfaces/task';
import { Item } from '../../items';
import { H5PExtra } from './extra';

export interface H5PTaskManager {
  createDownloadH5PFileTask(
    item: Item<Partial<H5PExtra>>,
    destinationPath: string,
    member: Actor,
  ): Task<Actor, ReadStream>;
}
