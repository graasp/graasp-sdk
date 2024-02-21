import { DiscriminatedItem } from './item.js';

/**
 * Returns the item path given an array of ids
 * @param ids consecutive item ids
 * @returns path of consecutive items
 */
export const buildPathFromIds = (...ids: string[]): string => {
  return ids.join('.').replace(/-/g, '_');
};

/**
 * Returns an array of item ids given an item path
 * @param  {string} path item's path
 * @returns ids array
 */
export const getIdsFromPath = (path: string): string[] =>
  path.replace(/_/g, '-').split('.');

/**
 * Returns the parent id given an item path
 */
export function getParentFromPath(itemPath: string): string | undefined {
  const ids = getIdsFromPath(itemPath);
  return ids.length >= 2 ? ids[ids.length - 2] : undefined;
}

/**
 * Returns the last item id in the path
 * @param  {string} itemPath item's path
 * @returns children ids
 */
export function getChildFromPath(itemPath: string): string {
  const ids = getIdsFromPath(itemPath);
  return ids[ids.length - 1];
}

/**
 * Asserts whether an item is a child of another item given their paths
 * @param  {string} path item path
 * @param  {string} parentPath parent path
 * @returns whether item is child of given parent
 */
export const isChildOf = (path: string, parentPath: string): boolean => {
  const reg = new RegExp(`${parentPath}(?=\\.[^\\.]*$)`);
  return Boolean(path.match(reg));
};

/**
 * Asserts whether a given item is a descendant of a parent item
 * @param path path of the item under test
 * @param parentPath path of the parent item
 * @returns whether the item is bellow the parent in the tree (any depth level)
 */
export const isDescendantOf = (path: string, parentPath: string): boolean =>
  path.startsWith(parentPath);

/**
 * Asserts whether an item is a root item
 */
export const isRootItem = ({
  path,
}: Pick<DiscriminatedItem, 'path'>): boolean => !path.includes('.');

/**
 * Sorts children given order array
 * @param  children children to be sorted
 * @param  idsOrder non-exhaustive ids in order
 * @returns array of ordered children
 */
export const sortChildrenWith = (
  children: DiscriminatedItem[],
  idsOrder: string[],
): DiscriminatedItem[] => {
  const compareFn = (stElem: DiscriminatedItem, ndElem: DiscriminatedItem) => {
    if (idsOrder.indexOf(stElem.id) >= 0 && idsOrder.indexOf(ndElem.id) >= 0) {
      return idsOrder.indexOf(stElem.id) - idsOrder.indexOf(ndElem.id);
    }
    if (idsOrder.indexOf(stElem.id) >= 0) {
      return -1;
    }

    if (idsOrder.indexOf(ndElem.id) >= 0) {
      return 1;
    }

    return stElem.createdAt < ndElem.createdAt ? -1 : 1;
  };

  return children.toSorted(compareFn);
};
