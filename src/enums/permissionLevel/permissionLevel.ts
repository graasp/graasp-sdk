export enum PermissionLevel {
  /**
   * Allows to view items and create app Data in apps
   */
  Read = 'read',
  /**
   * Allows to create new items and edit existing items
   */
  Write = 'write',
  /**
   * Allows to admin item properties, sharing and destructive actions
   */
  Admin = 'admin',
}

export class PermissionLevelCompare {
  /**
   * `a` is a better permission level when compared to `b`
   */
  static gt = (a: PermissionLevel, b: PermissionLevel): boolean =>
    (a === PermissionLevel.Admin &&
      (b === PermissionLevel.Write || b === PermissionLevel.Read)) ||
    (a === PermissionLevel.Write && b === PermissionLevel.Read);

  /**
   * `a` is a better, or the same, permission level when compared to `b`.
   */
  static gte = (a: PermissionLevel, b: PermissionLevel): boolean =>
    a === b || PermissionLevelCompare.gt(a, b);

  /**
   * `a` is a worse permission level when compared to `b`.
   */
  static lt = (a: PermissionLevel, b: PermissionLevel): boolean =>
    (a === PermissionLevel.Read &&
      (b === PermissionLevel.Write || b === PermissionLevel.Admin)) ||
    (a === PermissionLevel.Write && b === PermissionLevel.Admin);

  /**
   * `a` is a worse, or the same, permission level when compared to `b`.
   */
  static lte = (a: PermissionLevel, b: PermissionLevel): boolean =>
    a === b || PermissionLevelCompare.lt(a, b);

  static getHighest = (
    permissions?: PermissionLevel[],
  ): PermissionLevel | null => {
    if (!permissions?.length) {
      return null;
    }

    if (permissions.includes(PermissionLevel.Admin)) {
      return PermissionLevel.Admin;
    }
    if (permissions.includes(PermissionLevel.Write)) {
      return PermissionLevel.Write;
    }
    if (permissions.includes(PermissionLevel.Read)) {
      return PermissionLevel.Read;
    }

    return null;
  };
}
