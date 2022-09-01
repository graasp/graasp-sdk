// Graasp limits

/**
 * Maximum items tree depth
 */
export const MAX_TREE_LEVELS = 15;
/**
 * Maximum number of children an item can have
 */
export const MAX_NUMBER_OF_CHILDREN = 100;
/**
 * Maximum number of descendants (in the item's subtree) for a `delete`
 */
export const MAX_DESCENDANTS_FOR_DELETE = 100;
/**
 * Maximum number of descendants (in the item's subtree) for a `update`
 */
export const MAX_DESCENDANTS_FOR_UPDATE = 100;
/**
 * Maximum number of descendants (in the item's subtree) for a `move`
 */
export const MAX_DESCENDANTS_FOR_MOVE = 100;
/**
 * Maximum number of descendants (in the item's subtree) for a `copy`
 */
export const MAX_DESCENDANTS_FOR_COPY = 100;

/**
 * Maximum number of item memberships when deleting all "under" an item
 */
export const MAX_ITEM_MEMBERSHIPS_FOR_DELETE = 100;

/**
 * Maximum number of targets in a "many" request that only reads data (`get`)
 */
export const MAX_TARGETS_FOR_READ_REQUEST = MAX_TREE_LEVELS;
/**
 * Maximum number of targets in a "many" request that modifies data (`update`, `delete`)
 */
export const MAX_TARGETS_FOR_MODIFY_REQUEST = 20;
/**
 * Maximum number of targets in a "many" request for which the server
 * will execute the tasks and return the results in the same request's response.
 *
 * A request with more targets than this limit should get an immediate `202` response,
 * and the results should be pushed to the client (websockets, ...) as they happen.
 */
export const MAX_TARGETS_FOR_MODIFY_REQUEST_W_RESPONSE = 5;

/**
 * Maximum size for a uploaded zip to be extracted
 */
export const ZIP_MAX_FILE_SIZE = 1024 * 1024 * 250; // 250MB

/**
 * Maximum size for an uploaded file
 */
export const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB
