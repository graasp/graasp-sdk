declare type ErrorOrigin = 'core' | 'plugin' | 'unknown' | string;

interface GraaspError extends Error {
  data?: unknown;
  origin: ErrorOrigin;
}

interface GraaspErrorDetails {
  code: string;
  message: string;
  statusCode: number;
  name?: string;
}

abstract class BaseGraaspError implements GraaspError {
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

/**
 * This util function detects if the returned object is an error
 * We often need to define those errors within a requested array of multiple instances
 */
export const isError = (obj: unknown): boolean => {
  if (!obj || typeof obj !== 'object') {
    return false;
  } else {
    return 'statusCode' in obj || obj instanceof Error;
  }
};
