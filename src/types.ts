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
