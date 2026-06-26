import { PackedItem } from '@/item/packedItem.js';
import { CompleteMember, MemberType } from '@/member/member.js';

// TODO: reuse action op?
export enum Operation {
  ReadItem = 'read-item',
  MoveItem = 'move-item',
  CopyItem = 'copy-item',
  HideItem = 'hide-item',
  DownloadItem = 'download-item',
}

// don't take into account hidden: suppose backend will prevent read from beginning
// pseudonymized users cannot create items and can only view a specific item
const SIGNED_IN_OPERATIONS_PERMISSIONS = {
  [Operation.ReadItem]: {
    admin: true,
    write: true,
    read: true,
    pseudonymized: true,
    public: true,
  },
  [Operation.CopyItem]: {
    admin: true,
    write: true,
    read: true,
    pseudonymized: false,
    public: true,
  },
  [Operation.MoveItem]: {
    admin: true,
    write: true,
    read: false,
    pseudonymized: false,
    public: false,
  },
  [Operation.DownloadItem]: {
    admin: true,
    write: true,
    read: true,
    pseudonymized: true,
    public: true,
  },
  [Operation.HideItem]: {
    admin: true,
    write: true,
    read: false,
    pseudonymized: false,
    public: false,
  },
};

const SIGNED_OUT_OPERATIONS_PERMISSIONS = {
  [Operation.ReadItem]: {
    public: true,
  },
  [Operation.CopyItem]: {
    public: false,
  },
  [Operation.MoveItem]: {
    public: false,
  },
  [Operation.DownloadItem]: {
    public: true,
  },
  [Operation.HideItem]: {
    public: false,
  },
};

export const can = (
  operation: Operation,
  item: PackedItem,
  member?: CompleteMember,
) => {
  // TODO: correct
  const isPseudoMember = member?.type !== MemberType.Individual;

  if (!member) {
    const p = SIGNED_OUT_OPERATIONS_PERMISSIONS[operation];
    return item.public ? p.public : false;
  }

  let permissionKey = item.permission;
  if (isPseudoMember) {
    permissionKey = 'pseudonymized';
  } else if (!item.permission && item.public) {
    permissionKey = 'public';
  }

  return SIGNED_IN_OPERATIONS_PERMISSIONS[operation]?.[permissionKey] ?? false;
};
