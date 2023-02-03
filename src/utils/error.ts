/**
 * This util function detects if the returned object is an error
 * We often need to define those errors within a requested array of multiple instances
 * @param  {unknown} obj object to evaluate
 * @returns {boolean} whether the object is an error
 */
export const isError = (obj: unknown): boolean => {
  if (!obj || typeof obj !== 'object') {
    return false;
  } else if (obj) {
    return 'statusCode' in obj || obj instanceof Error;
  }
  return false;
};
