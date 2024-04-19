import { filesize } from 'filesize';

/**
 * Format a file size to a human readable string for display in the interface
 * @param size raw file size in bytes
 * @returns A string representing the human readable filesize
 */
export const formatFileSize = (size: number): string =>
  filesize(size, { base: 2, standard: 'jedec' });
