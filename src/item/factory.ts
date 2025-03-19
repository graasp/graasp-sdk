import { MemberFactory } from '../member/factory.js';
import { DiscriminatedItem } from './item.js';
import { buildPathFromIds } from './itemUtils.js';
import { PackedInformation, PackedItem } from './packedItem.js';
import { CCLicenseAdaptions } from '@/enums/ccLicenses.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
import { ItemVisibilityFactory } from '@/itemVisibility/itemVisibility.factory.js';
import {
  ItemVisibility,
  ItemVisibilityType,
} from '@/itemVisibility/itemVisibility.js';
import { faker } from '@faker-js/faker';

export type ItemFactoryOutputType<IT extends DiscriminatedItem> = Pick<
  IT,
  | 'id'
  | 'name'
  | 'description'
  | 'path'
  | 'settings'
  | 'creator'
  | 'extra'
  | 'type'
  | 'lang'
  | 'createdAt'
  | 'updatedAt'
>;

export type PackedItemFactoryOutputType<IT extends DiscriminatedItem> =
  ItemFactoryOutputType<IT> & PackedInformation;

export type ItemFactoryInputType<IT extends DiscriminatedItem> = Partial<IT> & {
  parentItem?: Pick<PackedItem, 'path'> &
    Partial<Pick<PackedItem, 'hidden' | 'public'>>;
};

export const PartialItemFactory = <IT extends DiscriminatedItem>(
  item: ItemFactoryInputType<IT> = {},
): Omit<ItemFactoryOutputType<IT>, 'type' | 'extra'> => {
  const id = item.id ?? faker.string.uuid();
  const createdAt: string =
    item.createdAt ?? faker.date.anytime().toISOString();
  const updatedAt: string =
    item.updatedAt ?? faker.date.anytime().toISOString();

  const path =
    item.path ??
    (item.parentItem ? item.parentItem.path + '.' : '') + buildPathFromIds(id);
  const name = item.name ?? faker.lorem.words({ min: 2, max: 12 });
  return {
    id,
    createdAt,
    updatedAt,
    path,
    name,
    description: item.description ?? faker.lorem.text(),
    settings:
      item.settings ??
      faker.helpers.arrayElement([
        {},
        {
          isPinned: faker.datatype.boolean(),
          showChatbox: faker.datatype.boolean(),
          hasThumbnail: false,
          isResizable: faker.datatype.boolean(),
          isCollapsible: faker.datatype.boolean(),
          enableSaveActions: faker.datatype.boolean(),
          tags: faker.lorem.words({ min: 1, max: 10 }).split(' '),
          displayCoEditors: faker.datatype.boolean(),
          ccLicenseAdaption: faker.helpers.enumValue(CCLicenseAdaptions),
        },
      ]),
    // allow null creator
    creator: item.creator === undefined ? MemberFactory() : item.creator,
    lang:
      item.lang ??
      faker.helpers.arrayElement(['fr', 'en', 'it', 'es', 'ar', 'de']),
  };
};

export type PackedInformationFactoryInput = {
  permission?: PermissionLevel | null;
  hiddenVisibility?: Partial<ItemVisibility>;
  publicVisibility?: Partial<ItemVisibility>;
};

export const PackedInformationFactory = (
  {
    permission = PermissionLevel.Admin,
    hiddenVisibility,
    publicVisibility,
  }: PackedInformationFactoryInput,
  item: DiscriminatedItem,
  parentItem: Partial<Pick<PackedItem, 'hidden' | 'public'>> = {},
): PackedInformation => {
  // use parent visibility if exists
  let hiddenItemVisibility = parentItem.hidden;
  // use given hidden visibility
  if (hiddenVisibility) {
    hiddenItemVisibility = ItemVisibilityFactory({
      type: ItemVisibilityType.Hidden,
      itemPath: item.path,
      ...hiddenVisibility,
    });
  }

  // use parent visibility if exists
  let publicItemVisibility = parentItem.public;
  // use given hidden visibility
  if (publicVisibility) {
    publicItemVisibility = ItemVisibilityFactory({
      type: ItemVisibilityType.Public,
      itemPath: item.path,
      ...publicVisibility,
    });
  }

  return {
    permission,
    ...(hiddenItemVisibility ? { hidden: hiddenItemVisibility } : {}),
    ...(publicItemVisibility ? { public: publicItemVisibility } : {}),
  };
};
