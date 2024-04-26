/**
 * add ellipsis on string given length
 * warning: use css instead of this function if possible
 * @param {any} longString:string
 * @param {any} maxLength:number
 * @returns {any}
 */
export const applyEllipsisOnLength = (
  longString: string,
  maxLength: number,
): string =>
  `${longString.slice(0, maxLength)}${
    (longString.length || 0) > maxLength ? '…' : ''
  }`;
