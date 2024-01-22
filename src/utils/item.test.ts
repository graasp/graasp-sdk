import { v4 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { DiscriminatedItem } from '..';
import {
  buildPathFromIds,
  getChildFromPath,
  getIdsFromPath,
  getParentFromPath,
  isChildOf,
  isDescendantOf,
  isRootItem,
  sortChildrenWith,
} from './item';

describe('Item Utils', () => {
  describe('buildPathFromIds', () => {
    it('Build correct paths for one id', () => {
      const oneId = 'cc7ad362-c220-4232-a474-decae17371ad';
      const onePath = buildPathFromIds(oneId);
      expect(onePath).toEqual('cc7ad362_c220_4232_a474_decae17371ad');
    });
    it('Build correct paths for many ids', () => {
      const id1 = 'cc7ad362-c220-4232-a474-decae17371ad';
      const id2 = 'dc7ad362-c220-4232-a474-decae17371ad';
      const id3 = 'ec7ad362-c220-4232-a474-decae17371ad';
      const path = buildPathFromIds(id1, id2, id3);
      expect(path).toEqual(
        'cc7ad362_c220_4232_a474_decae17371ad.dc7ad362_c220_4232_a474_decae17371ad.ec7ad362_c220_4232_a474_decae17371ad',
      );
    });
    it('Return empty path for empty id', () => {
      const path = buildPathFromIds();
      expect(path).toEqual('');
    });
  });

  describe('getIdsFromPath', () => {
    it('Get one id', () => {
      const pathWithOneId = 'cc7ad362_c220_4232_a474_decae17371ad';
      const oneId = getIdsFromPath(pathWithOneId);
      expect(oneId).toContain('cc7ad362-c220-4232-a474-decae17371ad');
    });

    it('Get three ids', () => {
      const pathWithThreeIds =
        'cc7ad362_c220_4232_a474_decae17371ad.cc7ad362_c220_4232_a474_decae17371a3.cc7ad362_c220_4232_a474_decae17371a2';
      const threeIds = getIdsFromPath(pathWithThreeIds);
      expect(threeIds).toEqual([
        'cc7ad362-c220-4232-a474-decae17371ad',
        'cc7ad362-c220-4232-a474-decae17371a3',
        'cc7ad362-c220-4232-a474-decae17371a2',
      ]);
    });
  });

  describe('getParentFromPath', () => {
    it('get parent id', () => {
      const parent = v4();
      const child = v4();
      expect(getParentFromPath(buildPathFromIds(parent, child))).toBe(parent);
      expect(getParentFromPath(buildPathFromIds(child))).toBe(undefined);
    });
  });

  describe('getChildFromPath', () => {
    it('extract child id', () => {
      const parent = v4();
      const child = v4();
      expect(getChildFromPath(buildPathFromIds(parent, child))).toBe(child);
      expect(getChildFromPath(buildPathFromIds(child))).toBe(child);
    });
  });

  describe('isChildOf', () => {
    it('return false', () => {
      const parent = buildPathFromIds(v4());
      const child = buildPathFromIds(v4());
      expect(isChildOf(child, parent)).toBeFalsy();
    });
    it('return true', () => {
      const parentId = v4();
      const parent = buildPathFromIds(parentId);
      const child = buildPathFromIds(parentId, v4());
      expect(isChildOf(child, parent)).toBeTruthy();
    });
  });

  describe('isDescendantOf', () => {
    it('Two root elements are not descendants', () => {
      const parent = buildPathFromIds(v4());
      const child = buildPathFromIds(v4());
      expect(isDescendantOf(child, parent)).toBeFalsy();
    });
    it('Direct children is a descendant', () => {
      const parentId = v4();
      const parent = buildPathFromIds(parentId);
      const child = buildPathFromIds(parentId, v4());
      expect(isDescendantOf(child, parent)).toBeTruthy();
    });
    it('Deep descendant', () => {
      const grandParentId = v4();
      const parentId = v4();
      const grandParent = buildPathFromIds(grandParentId);
      const parent = buildPathFromIds(grandParentId, parentId);
      const child = buildPathFromIds(grandParentId, parentId, v4());
      expect(isDescendantOf(child, parent)).toBeTruthy();
      expect(isDescendantOf(child, grandParent)).toBeTruthy();
    });
  });

  describe('isRootItem', () => {
    it('Nested item is not root', () => {
      const id = v4();
      const parentId = v4();
      const item = { id, path: buildPathFromIds(parentId, id) };
      expect(isRootItem(item)).toBeFalsy();
    });
    it('Item without parent is root', () => {
      const id = v4();
      const item = { id, path: buildPathFromIds(id) };
      expect(isRootItem(item)).toBeTruthy();
    });
  });

  describe('sortChildrenWith', () => {
    it('correctly sort children', () => {
      const children = [
        { id: v4() },
        { id: v4() },
        { id: v4() },
        { id: v4() },
      ] as DiscriminatedItem[];
      const order = [
        children[1].id,
        children[3].id,
        children[2].id,
        children[0].id,
      ];
      expect(sortChildrenWith(children, order)).toEqual([
        children[1],
        children[3],
        children[2],
        children[0],
      ]);
    });
    it('correctly sort despite containing falsy ids', () => {
      const children = [
        { id: v4() },
        { id: v4() },
        { id: v4() },
        { id: v4() },
      ] as DiscriminatedItem[];
      const order = [
        children[1].id,
        v4(),
        children[3].id,
        children[2].id,
        children[0].id,
        v4(),
      ];
      expect(sortChildrenWith(children, order)).toEqual([
        children[1],
        children[3],
        children[2],
        children[0],
      ]);
    });
    it('sort by created at children outside of the ordered array', () => {
      const children = [
        { id: v4(), createdAt: '2024-01-07T19:24:29.058Z' },
        { id: v4(), createdAt: '2024-01-07T18:24:29.058Z' },
        { id: v4(), createdAt: '2024-03-07T19:24:29.058Z' },
        { id: v4(), createdAt: '2024-04-07T19:24:29.058Z' },
      ] as DiscriminatedItem[];
      const order = [children[3].id, children[2].id];
      expect(sortChildrenWith(children, order)).toEqual([
        children[3],
        children[2],
        children[1],
        children[0],
      ]);
    });
  });
});
