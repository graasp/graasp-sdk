import { describe, expect, it } from 'vitest';

import { PermissionLevel, PermissionLevelCompare } from './permissionLevel';

describe('PermissionLevelCompare', () => {
  it('gt', () => {
    expect(
      PermissionLevelCompare.gt(PermissionLevel.Read, PermissionLevel.Read),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.gt(PermissionLevel.Read, PermissionLevel.Write),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.gt(PermissionLevel.Read, PermissionLevel.Admin),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.gt(PermissionLevel.Write, PermissionLevel.Read),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.gt(PermissionLevel.Write, PermissionLevel.Write),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.gt(PermissionLevel.Write, PermissionLevel.Admin),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.gt(PermissionLevel.Admin, PermissionLevel.Read),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.gt(PermissionLevel.Admin, PermissionLevel.Write),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.gt(PermissionLevel.Admin, PermissionLevel.Admin),
    ).toBeFalsy();
  });

  it('gte', () => {
    expect(
      PermissionLevelCompare.gte(PermissionLevel.Read, PermissionLevel.Read),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.gte(PermissionLevel.Read, PermissionLevel.Write),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.gte(PermissionLevel.Read, PermissionLevel.Admin),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.gte(PermissionLevel.Write, PermissionLevel.Read),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.gte(PermissionLevel.Write, PermissionLevel.Write),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.gte(PermissionLevel.Write, PermissionLevel.Admin),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.gte(PermissionLevel.Admin, PermissionLevel.Read),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.gte(PermissionLevel.Admin, PermissionLevel.Write),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.gte(PermissionLevel.Admin, PermissionLevel.Admin),
    ).toBeTruthy();
  });
  it('lt', () => {
    expect(
      PermissionLevelCompare.lt(PermissionLevel.Read, PermissionLevel.Read),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.lt(PermissionLevel.Read, PermissionLevel.Write),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.lt(PermissionLevel.Read, PermissionLevel.Admin),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.lt(PermissionLevel.Write, PermissionLevel.Read),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.lt(PermissionLevel.Write, PermissionLevel.Write),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.lt(PermissionLevel.Write, PermissionLevel.Admin),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.lt(PermissionLevel.Admin, PermissionLevel.Read),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.lt(PermissionLevel.Admin, PermissionLevel.Write),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.lt(PermissionLevel.Admin, PermissionLevel.Admin),
    ).toBeFalsy();
  });
  it('lte', () => {
    expect(
      PermissionLevelCompare.lte(PermissionLevel.Read, PermissionLevel.Read),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.lte(PermissionLevel.Read, PermissionLevel.Write),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.lte(PermissionLevel.Read, PermissionLevel.Admin),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.lte(PermissionLevel.Write, PermissionLevel.Read),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.lte(PermissionLevel.Write, PermissionLevel.Write),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.lte(PermissionLevel.Write, PermissionLevel.Admin),
    ).toBeTruthy();
    expect(
      PermissionLevelCompare.lte(PermissionLevel.Admin, PermissionLevel.Read),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.lte(PermissionLevel.Admin, PermissionLevel.Write),
    ).toBeFalsy();
    expect(
      PermissionLevelCompare.lte(PermissionLevel.Admin, PermissionLevel.Admin),
    ).toBeTruthy();
  });
  it('getHighest', () => {
    expect(PermissionLevelCompare.getHighest()).toEqual(null);
    expect(PermissionLevelCompare.getHighest([])).toEqual(null);
    expect(
      PermissionLevelCompare.getHighest([
        PermissionLevel.Read,
        PermissionLevel.Read,
      ]),
    ).toEqual(PermissionLevel.Read);
    expect(
      PermissionLevelCompare.getHighest([
        PermissionLevel.Read,
        PermissionLevel.Write,
      ]),
    ).toEqual(PermissionLevel.Write);
    expect(
      PermissionLevelCompare.getHighest([
        PermissionLevel.Read,
        PermissionLevel.Admin,
      ]),
    ).toEqual(PermissionLevel.Admin);
    expect(
      PermissionLevelCompare.getHighest([
        PermissionLevel.Write,
        PermissionLevel.Read,
      ]),
    ).toEqual(PermissionLevel.Write);
    expect(
      PermissionLevelCompare.getHighest([
        PermissionLevel.Write,
        PermissionLevel.Write,
      ]),
    ).toEqual(PermissionLevel.Write);
    expect(
      PermissionLevelCompare.getHighest([
        PermissionLevel.Write,
        PermissionLevel.Admin,
      ]),
    ).toEqual(PermissionLevel.Admin);
    expect(
      PermissionLevelCompare.getHighest([
        PermissionLevel.Admin,
        PermissionLevel.Read,
      ]),
    ).toEqual(PermissionLevel.Admin);
    expect(
      PermissionLevelCompare.getHighest([
        PermissionLevel.Admin,
        PermissionLevel.Write,
      ]),
    ).toEqual(PermissionLevel.Admin);
    expect(
      PermissionLevelCompare.getHighest([
        PermissionLevel.Admin,
        PermissionLevel.Admin,
      ]),
    ).toEqual(PermissionLevel.Admin);
  });
});
