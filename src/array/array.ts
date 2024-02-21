/**
 * Split array in two parts given condition
 * @param  {unknown[]} array
 * @param  {(unknown, number): boolean} condition
 * @return two dimensional array of length two
 */
export const partitionArray = <A = unknown>(
  array: A[],
  condition: (element: A, idx: number) => boolean,
) =>
  array.reduce(
    (result: A[][], element, idx) => {
      result[condition(element, idx) ? 0 : 1].push(element);
      return result;
    },
    [[], []],
  );

/**
 * Split array in several chunks given the chunk size
 * @param  {T[]} array
 * @param  {number} chunkSize chunk size, should be greater than zero
 * @return two dimensional array containing arrays of length at least chunkSize
 */
export const spliceIntoChunks = <T>(arr: T[], chunkSize: number) => {
  if (chunkSize <= 0) {
    throw new Error('chunkSize should be greater than zero');
  }

  // Creating the clone of the array
  const newArray = arr.slice(0);

  const res = [];
  while (newArray.length > 0) {
    const chunk = newArray.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
};
