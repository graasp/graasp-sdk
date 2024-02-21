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

// TODO: add usage informations

/**
 * This allow to define a type with at least one attribute of T that is not a key in E.
 */
export type AnyOfExcept<T, E extends keyof T> = AnyOf<Omit<T, E>>;
