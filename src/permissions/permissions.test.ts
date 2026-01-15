import { describe, expect, it } from 'vitest';

import { Operation, can } from './permissions.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';
import { PackedFolderItemFactory } from '@/item/folderItem/folderItem.factory.js';
import { MemberFactory } from '@/member/factory.js';
import { MemberType } from '@/member/member.js';

const privateItem = PackedFolderItemFactory({}, { permission: null });
const privateItemWithAdmin = PackedFolderItemFactory(
  {},
  { permission: PermissionLevel.Admin },
);
const privateItemWithWrite = PackedFolderItemFactory(
  {},
  { permission: PermissionLevel.Write },
);
const privateItemWithRead = PackedFolderItemFactory(
  {},
  { permission: PermissionLevel.Read },
);
const publicItem = PackedFolderItemFactory(
  {},
  { permission: null, publicTag: {} },
);
const publicItemWithAdmin = PackedFolderItemFactory(
  {},
  { permission: PermissionLevel.Admin, publicTag: {} },
);
const publicItemWithWrite = PackedFolderItemFactory(
  {},
  { permission: PermissionLevel.Admin, publicTag: {} },
);
const publicItemWithRead = PackedFolderItemFactory(
  {},
  { permission: PermissionLevel.Read, publicTag: {} },
);

const signedInMember = MemberFactory();
// TODO: to change
const pseudonymizedMember = MemberFactory({ type: MemberType.Group });

describe('can', () => {
  it(Operation.CopyItem + ' and signed in', () => {
    expect(can(Operation.CopyItem, privateItem, signedInMember)).toBeFalsy();
    expect(
      can(Operation.CopyItem, privateItemWithAdmin, signedInMember),
    ).toBeTruthy();
    expect(
      can(Operation.CopyItem, privateItemWithWrite, signedInMember),
    ).toBeTruthy();
    expect(
      can(Operation.CopyItem, privateItemWithRead, signedInMember),
    ).toBeTruthy();
    expect(can(Operation.CopyItem, publicItem, signedInMember)).toBeTruthy();
    expect(
      can(Operation.CopyItem, publicItemWithAdmin, signedInMember),
    ).toBeTruthy();
    expect(
      can(Operation.CopyItem, publicItemWithWrite, signedInMember),
    ).toBeTruthy();
    expect(
      can(Operation.CopyItem, publicItemWithRead, signedInMember),
    ).toBeTruthy();
  });
  it(Operation.CopyItem + ' and signed out', () => {
    expect(can(Operation.CopyItem, privateItem, undefined)).toBeFalsy();
    expect(
      can(Operation.CopyItem, privateItemWithAdmin, undefined),
    ).toBeFalsy();
    expect(
      can(Operation.CopyItem, privateItemWithWrite, undefined),
    ).toBeFalsy();
    expect(can(Operation.CopyItem, privateItemWithRead, undefined)).toBeFalsy();
    expect(can(Operation.CopyItem, publicItem, undefined)).toBeFalsy();
    expect(can(Operation.CopyItem, publicItemWithAdmin, undefined)).toBeFalsy();
    expect(can(Operation.CopyItem, publicItemWithWrite, undefined)).toBeFalsy();
    expect(can(Operation.CopyItem, publicItemWithRead, undefined)).toBeFalsy();
  });
  it(Operation.CopyItem + ' and pseudonimized', () => {
    expect(
      can(Operation.CopyItem, privateItem, pseudonymizedMember),
    ).toBeFalsy();
    expect(
      can(Operation.CopyItem, privateItemWithAdmin, pseudonymizedMember),
    ).toBeFalsy();
    expect(
      can(Operation.CopyItem, privateItemWithWrite, pseudonymizedMember),
    ).toBeFalsy();
    expect(
      can(Operation.CopyItem, privateItemWithRead, pseudonymizedMember),
    ).toBeFalsy();
    expect(
      can(Operation.CopyItem, publicItem, pseudonymizedMember),
    ).toBeFalsy();
    expect(
      can(Operation.CopyItem, publicItemWithAdmin, pseudonymizedMember),
    ).toBeFalsy();
    expect(
      can(Operation.CopyItem, publicItemWithWrite, pseudonymizedMember),
    ).toBeFalsy();
    expect(
      can(Operation.CopyItem, publicItemWithRead, pseudonymizedMember),
    ).toBeFalsy();
  });

  it(Operation.ReadItem + ' and pseudonimzed', () => {
    expect(
      can(Operation.ReadItem, privateItem, pseudonymizedMember),
    ).toBeTruthy();
    expect(
      can(Operation.ReadItem, publicItem, pseudonymizedMember),
    ).toBeTruthy();
  });
});
