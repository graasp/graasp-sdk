/**
 * Allows to create a union type from a const object.
 *
 * Usage:
 * ```ts
 * const Values = {
 *   One: 'one',
 *   Two: 'two',
 * } as const;
 * type MyUnionValues = UnionOfConst<typeof Values>; // will be: 'one' | 'two'
 * ```
 */
export type UnionOfConst<T extends { [key: string]: string }> = `${T[keyof T]}`;

// TODO: document how to use and where to use this type
// multiple data returned value
export type ResultOf<T> = {
  data: {
    [key: string]: T;
  };
  errors: Error[];
};

// TODO: add usage informations
/**
 * This allow to define a type with at least one attribute of T.
 */
export type AnyOf<T> = {
  [K in keyof T]: Pick<T, K>;
}[keyof T];

/**
 * This allow to define a type with at least one attribute of T that is not a key in E.
 *
 * The following type add usage informations about:
 * `type ShortLinkPatchPayload = AnyOfExcept<ShortLinkPostPayload, 'itemId'>;`
 * - The `itemId` is not allowed.
 * - All other attributes of ShortLinkPostPayload are allowed and optional.
 * - At least of attribute is required.
 */
export type AnyOfExcept<T, E extends keyof T> = AnyOf<Omit<T, E>>;

/**
 * The type is T or null.
 *
 * - `type NullableString = Nullable<string>`:
 *   - `const nullableString: NullableString<string> = "my string";`
 *   - `const nullableString: NullableString<string> = null;`
 * - `type NullableMultipleType = Nullable<string | boolean | number>`:
 */
export type Nullable<T> = T | null;
