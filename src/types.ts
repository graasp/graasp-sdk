// alias type for uuid v4
export type UUID = string;

export type UnionOfConst<T extends { [key: string]: string }> = `${T[keyof T]}`;
