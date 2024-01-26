declare type ErrorOrigin = 'core' | 'plugin' | 'unknown' | string;

export interface GraaspError extends Error {
  data?: unknown;
  origin: ErrorOrigin;
}

export interface GraaspErrorDetails {
  code: string;
  message: string;
  statusCode: number;
  name?: string;
}

export abstract class BaseGraaspError implements GraaspError {
  name!: string;
  code!: string;
  statusCode?: number;
  message!: string;
  data?: unknown;
  origin!: ErrorOrigin;

  constructor(
    { code, statusCode, message, name }: GraaspErrorDetails,
    data?: unknown,
  ) {
    this.code = code;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.name = name ?? message;
  }
}

export const ErrorFactory = (origin: ErrorOrigin) => {
  return class MyError extends BaseGraaspError {
    origin = origin;
  };
};
