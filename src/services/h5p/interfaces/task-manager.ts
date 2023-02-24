import { ReadStream } from 'fs';

import { Actor } from '../../../interfaces/actor';
import { Task } from '../../../interfaces/task';
import { Item } from '../../items';
import { H5PItemExtra } from './extra';

export interface H5PTaskManager {
  createDownloadH5PFileTask(
    item: Item<Partial<H5PItemExtra>>,
    destinationPath: string,
    member: Actor,
  ): Task<Actor, ReadStream>;
}
