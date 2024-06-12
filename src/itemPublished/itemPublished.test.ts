import { describe, expect, it } from 'vitest';

import { PublishableItemTypeChecker } from './itemPublished.js';
import { ItemType } from '@/item/itemType.js';

describe('ItemPublished', () => {
  describe('PublishableItemTypeChecker', () => {
    describe('Authorized item types to be published', () => {
      it('"Folder" type is allowed to be published', () => {
        expect(
          PublishableItemTypeChecker.isItemTypeAllowedToBePublished(
            ItemType.FOLDER,
          ),
        ).toBeTruthy();
      });
    });

    describe('Unauthorized item types to be published', () => {
      const unauthorizedTypes = Object.values(ItemType).filter(
        (t) => !PublishableItemTypeChecker.isItemTypeAllowedToBePublished(t),
      );

      it.each(unauthorizedTypes)(
        'Item type "%s" is not allowed to be published',
        (type) => {
          expect(unauthorizedTypes).includes(type);
          expect(
            PublishableItemTypeChecker.isItemTypeAllowedToBePublished(type),
          ).toBeFalsy();
        },
      );
    });
  });
});
