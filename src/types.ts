// alias type for uuid v4
export type UUID = string;

export type UnionOfConst<T extends { [key: string]: string }> = `${T[keyof T]}`;
// multiple data returned value
export type ResultOf<T> = {
  data: {
    [key: string]: T;
  };
  errors: Error[];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * This allow to define a type with at least one attribute of T.
 */
export type AnyOf<T> = {
  [K in keyof T]: Pick<T, K>;
}[keyof T];

/**
 * This allow to define a type with at least one attribute of T that is not a key in E.
 */
export type AnyOfExcept<T, E extends keyof T> = AnyOf<Omit<T, E>>;
