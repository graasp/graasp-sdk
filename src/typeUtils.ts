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

/**
 * The type is T or null.
 *
 * - `type NullableString = Nullable<string>`:
 *   - `const nullableString: NullableString<string> = "my string";`
 *   - `const nullableString: NullableString<string> = null;`
 * - `type NullableMultipleType = Nullable<string | boolean | number>`:
 */
export type Nullable<T> = T | null;
