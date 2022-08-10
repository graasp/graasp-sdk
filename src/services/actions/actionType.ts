export enum ActionType {
  COPY_ITEM = 'copy_item',
  CREATE_ITEM = 'create_item',
  DELETE_ITEM = 'delete_item',
  MOVE_ITEM = 'move_item',
  UPDATE_ITEM = 'update_item',

  CREATE_ITEM_MEMBERSHIP = 'create_item_membership',
  DELETE_ITEM_MEMBERSHIP = 'delete_item_membership',
  UPDATE_ITEM_MEMBERSHIP = 'update_item_membership',

  // create member is related to register
  UPDATE_MEMBER = 'update_member',
  DELETE_MEMBER = 'delete_member',

  AUTH_REGISTER = 'auth_register',
  AUTH_SIGN_IN = 'auth_sign_in',
  AUTH_SIGN_IN_PASSWORD = 'auth_sign_in_password',
  AUTH_SIGN_OUT = 'auth_sign_out',
  AUTH_UPDATE_PASSWORD = 'auth_update_password',
}
