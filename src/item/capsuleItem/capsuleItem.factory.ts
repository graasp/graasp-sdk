import {
  ItemFactoryInputType,
  ItemFactoryOutputType,
  PackedInformationFactory,
  PackedInformationFactoryInput,
  PackedItemFactoryOutputType,
  PartialItemFactory,
} from '../factory.js';
import { ItemType } from '../itemType.js';
import { CapsuleItemType } from './capsuleItem.js';

export const CapsuleItemFactory = (
  item: ItemFactoryInputType<CapsuleItemType> = {},
): ItemFactoryOutputType<CapsuleItemType> => {
  const newItem = PartialItemFactory({ ...item });
  return {
    ...newItem,
    type: ItemType.FOLDER,
    extra: {
      [ItemType.FOLDER]: { isCapsule: true },
    },
  };
};

export const PackedCapsuleItemFactory = (
  item: ItemFactoryInputType<CapsuleItemType> = {},
  packedInfo: PackedInformationFactoryInput = {},
): PackedItemFactoryOutputType<CapsuleItemType> => {
  const newItem = CapsuleItemFactory(item);
  const packed = PackedInformationFactory(packedInfo, newItem, item.parentItem);
  return {
    ...newItem,
    ...packed,
  };
};
