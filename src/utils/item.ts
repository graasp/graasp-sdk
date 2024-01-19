import { DiscriminatedItem, Item } from '@/index';

/**
 * @param ids consecutive item ids
 * @returns path of consecutive items
 */
export const buildPathFromIds = (...ids: string[]): string => {
  return ids.join('.').replace(/-/g, '_');
};
/**
 * @param  {string} path item's path
 * @returns ids array
 */
export const getIdsFromPath = (path: string): string[] =>
  path.replace(/_/g, '-').split('.');

/**
 *  helper function to find parent of item given path
 * @param  {string} itemPath
 * @returns string
 */
export function getParentFromPath(itemPath: string): string | undefined {
  const ids = getIdsFromPath(itemPath);
  return ids.length >= 2 ? ids[ids.length - 2] : undefined;
}

/**
 * helper function to extract child ID from item path
 * @param  {string} itemPath item's path
 * @returns children ids
 */
export function getChildFromPath(itemPath: string): string {
  const ids = getIdsFromPath(itemPath);
  return ids[ids.length - 1];
}

/**
 * @param  {string} path item path
 * @param  {string} parentPath parent path
 * @returns whether item is child of given parent
 */
export const isChildOf = (path: string, parentPath: string) => {
  const reg = new RegExp(`${parentPath}(?=\\.[^\\.]*$)`);
  return path.match(reg);
};

/**
 * Assert whether a given item is a descendant of a parent item
 * @param path path of the item under test
 * @param parentPath path of the parent item
 * @returns whether the item is bellow the parent in the tree (any depth level)
 */
export const isDescendantOf = (path: string, parentPath: string) =>
  path.startsWith(parentPath);

/**
 * @param  {Item} item
 * @returns whether the item is a root
 */
export const isRootItem = ({ path }: Pick<Item, 'path'>) => !path.includes('.');

/**
 * Sort children given order array
 * @param  {Item[]} children children to be sorted
 * @param  {string[]} idsOrder non-exhaustive ids in order
 * @returns array of ordered children
 */
export const sortChildrenWith = (
  children: DiscriminatedItem[],
  idsOrder: string[],
) => {
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
