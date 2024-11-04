/**
 * This code was adapted from the `validator.js` package
 * https://github.com/validatorjs/validator.js/tree/master
 */

export function isByteLength(
  str: string,
  options?: Partial<{ min: number; max: number }>,
) {
  const min = options?.min ?? 0;
  const len = encodeURI(str).split(/%..|./).length - 1;
  if (typeof options?.max === 'undefined') {
    return len >= min;
  }
  return len >= min && len <= options.max;
}
