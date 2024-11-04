export function merge<T extends Record<string, unknown>>(
  obj: Partial<T>,
  defaults: T,
): T {
  for (const key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj as T;
}

/**
 * Count occurrence of characters in a string
 * @param str string to process
 * @returns an object with character keys and values occurrence of char
 */
export function countChars(str: string) {
  const result: Record<string, number> = {};
  for (const char of Array.from(str)) {
    if (result[char]) {
      result[char] += 1;
    } else {
      result[char] = 1;
    }
  }
  return result;
}
