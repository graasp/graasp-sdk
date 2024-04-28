import { MemberFactory } from '../member/factory.js';
import { DiscriminatedItem } from './item.js';
import { buildPathFromIds } from './itemUtils.js';
import { PackedInformation, PackedItem } from './packedItem.js';
import { CCLicenseAdaptions } from '@/enums/ccLicenses.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
import { ItemTagFactory } from '@/itemTag/itemTag.factory.js';
import { ItemTag, ItemTagType } from '@/itemTag/itemTag.js';
import { faker } from '@faker-js/faker';

export type ItemFactoryOutputType<IT extends DiscriminatedItem> = Pick<
  IT,
  | 'id'
  | 'name'
  | 'displayName'
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

  return {
    id,
    createdAt,
    updatedAt,
    path,
    name: item.name ?? faker.helpers.multiple(faker.lorem.word).join(' '),
    displayName:
      item.displayName ?? faker.helpers.multiple(faker.lorem.word).join(' '),
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
          tags: faker.helpers.multiple(faker.lorem.word),
          displayCoEditors: faker.datatype.boolean(),
          ccLicenseAdaption: faker.helpers.enumValue(CCLicenseAdaptions),
        },
      ]),
    // allow null creator
    creator: item.creator === undefined ? MemberFactory() : item.creator,
    lang: item.lang ?? faker.helpers.arrayElement(['fr', 'en']),
  };
};

export type PackedInformationFactoryInput = {
  permission?: PermissionLevel;
  hiddenTag?: Partial<ItemTag>;
  publicTag?: Partial<ItemTag>;
};

export const PackedInformationFactory = (
  {
    permission = PermissionLevel.Admin,
    hiddenTag,
    publicTag,
  }: PackedInformationFactoryInput,
  item: DiscriminatedItem,
  parentItem: Partial<Pick<PackedItem, 'hidden' | 'public'>> = {},
): PackedInformation => {
  // use parent tag if exists
  let hiddenItemTag = parentItem.hidden;
  // use given hidden tag
  if (hiddenTag) {
    hiddenItemTag = ItemTagFactory({
      type: ItemTagType.Hidden,
      item,
      ...hiddenTag,
    });
  }

  // use parent tag if exists
  let publicItemTag = parentItem.public;
  // use given hidden tag
  if (publicTag) {
    publicItemTag = ItemTagFactory({
      type: ItemTagType.Hidden,
      item,
      ...publicTag,
    });
  }

  return {
    permission,
    ...(hiddenItemTag ? { hidden: hiddenItemTag } : {}),
    ...(publicItemTag ? { public: publicItemTag } : {}),
  };
};
