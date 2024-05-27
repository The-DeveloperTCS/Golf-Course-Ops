import {
  createPermissionByRole as createPermissionByRoleService,
  updatePermissionByRole as updatePermissionByRoleService,
  deletePermissionByRole as deletePermissionByRoleService,
  getPermissionsByRoleList as getPermissionsByRoleListService,
  getSpecificPermissionByRole as getSpecificPermissionByRoleService,
} from "./service";

const permissionByRoleActions = {
  CREATE_PERMISSIONBYROLE_REQUEST:
    "permissionbyrole/create-permissionbyrole-request",
  CREATE_PERMISSIONBYROLE_SUCCESS:
    "permissionbyrole/create-permissionbyrole-success",
  CREATE_PERMISSIONBYROLE_FAILURE:
    "permissionbyrole/create-permissionbyrole-failure",
  UPDATE_PERMISSIONBYROLE_REQUEST:
    "permissionbyrole/update-permissionbyrole-request",
  UPDATE_PERMISSIONBYROLE_SUCCESS:
    "permissionbyrole/update-permissionbyrole-success",
  UPDATE_PERMISSIONBYROLE_FAILURE:
    "permissionbyrole/update-permissionbyrole-failure",
  DELETE_PERMISSIONBYROLE_REQUEST:
    "permissionbyrole/delete-permissionbyrole-request",
  DELETE_PERMISSIONBYROLE_SUCCESS:
    "permissionbyrole/delete-permissionbyrole-success",
  DELETE_PERMISSIONBYROLE_FAILURE:
    "permissionbyrole/delete-permissionbyrole-failure",
  GET_PERMISSIONSBYROLE_LIST_REQUEST:
    "permissionbyrole/get-permissionsbyrole-list-request",
  GET_PERMISSIONSBYROLE_LIST_SUCCESS:
    "permissionbyrole/get-permissionsbyrole-list-success",
  GET_PERMISSIONSBYROLE_LIST_FAILURE:
    "permissionbyrole/get-permissionsbyrole-list-failure",
  GET_SPECIFIC_PERMISSIONBYROLE_REQUEST:
    "permissionbyrole/get-specific-permissionbyrole-request",
  GET_SPECIFIC_PERMISSIONBYROLE_SUCCESS:
    "permissionbyrole/get-specific-permissionbyrole-success",
  GET_SPECIFIC_PERMISSIONBYROLE_FAILURE:
    "permissionbyrole/get-specific-permissionbyrole-failure",
};

export const createPermissionByRoleRequest = () => ({
  type: permissionByRoleActions.CREATE_PERMISSIONBYROLE_REQUEST,
});

export const createPermissionByRoleSuccess = (data) => ({
  type: permissionByRoleActions.CREATE_PERMISSIONBYROLE_SUCCESS,
  payload: data,
});

export const createPermissionByRoleFailure = (error) => ({
  type: permissionByRoleActions.CREATE_PERMISSIONBYROLE_FAILURE,
  error: error,
});

export const createPermissionByRole = (data) => {
  return async (dispatch) => {
    dispatch(createPermissionByRoleRequest());
    try {
      const response = await createPermissionByRoleService(data);
      dispatch(createPermissionByRoleSuccess(response));
    } catch (error) {
      dispatch(createPermissionByRoleFailure(error));
    }
  };
};

export const updatePermissionByRoleRequest = () => ({
  type: permissionByRoleActions.UPDATE_PERMISSIONBYROLE_REQUEST,
});

export const updatePermissionByRoleSuccess = (data) => ({
  type: permissionByRoleActions.UPDATE_PERMISSIONBYROLE_SUCCESS,
  payload: data,
});

export const updatePermissionByRoleFailure = (error) => ({
  type: permissionByRoleActions.UPDATE_PERMISSIONBYROLE_FAILURE,
  error: error,
});

export const updatePermissionByRole = (id, data) => {
  return async (dispatch) => {
    dispatch(updatePermissionByRoleRequest());
    try {
      const response = await updatePermissionByRoleService(id, data);
      dispatch(updatePermissionByRoleSuccess(response));
    } catch (error) {
      dispatch(updatePermissionByRoleFailure(error));
    }
  };
};

export const deletePermissionByRoleRequest = () => ({
  type: permissionByRoleActions.DELETE_PERMISSIONBYROLE_REQUEST,
});

export const deletePermissionByRoleSuccess = (data) => ({
  type: permissionByRoleActions.DELETE_PERMISSIONBYROLE_SUCCESS,
  payload: data,
});

export const deletePermissionByRoleFailure = (error) => ({
  type: permissionByRoleActions.DELETE_PERMISSIONBYROLE_FAILURE,
  error: error,
});

export const deletePermissionByRole = (id) => {
  return async (dispatch) => {
    dispatch(deletePermissionByRoleRequest());
    try {
      const response = await deletePermissionByRoleService(id);
      dispatch(deletePermissionByRoleSuccess(response));
    } catch (error) {
      dispatch(deletePermissionByRoleFailure(error));
    }
  };
};

export const getPermissionsByRoleListRequest = () => ({
  type: permissionByRoleActions.GET_PERMISSIONSBYROLE_LIST_REQUEST,
});

export const getPermissionsByRoleListSuccess = (data) => ({
  type: permissionByRoleActions.GET_PERMISSIONSBYROLE_LIST_SUCCESS,
  payload: data,
});

export const getPermissionsByRoleListFailure = (error) => ({
  type: permissionByRoleActions.GET_PERMISSIONSBYROLE_LIST_FAILURE,
  error: error,
});

export const getPermissionsByRoleList = (params) => {
  return async (dispatch) => {
    dispatch(getPermissionsByRoleListRequest());
    try {
      const response = await getPermissionsByRoleListService(params);
      dispatch(getPermissionsByRoleListSuccess(response));
    } catch (error) {
      dispatch(getPermissionsByRoleListFailure(error));
    }
  };
};

export const getSpecificPermissionByRoleRequest = () => ({
  type: permissionByRoleActions.GET_SPECIFIC_PERMISSIONBYROLE_REQUEST,
});

export const getSpecificPermissionByRoleSuccess = (data) => ({
  type: permissionByRoleActions.GET_SPECIFIC_PERMISSIONBYROLE_SUCCESS,
  payload: data,
});

export const getSpecificPermissionByRoleFailure = (error) => ({
  type: permissionByRoleActions.GET_SPECIFIC_PERMISSIONBYROLE_FAILURE,
  error: error,
});

export const getSpecificPermissionByRole = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificPermissionByRoleRequest());
    try {
      const response = await getSpecificPermissionByRoleService(id);
      dispatch(getSpecificPermissionByRoleSuccess(response));
    } catch (error) {
      dispatch(getSpecificPermissionByRoleFailure(error));
    }
  };
};

export default permissionByRoleActions;
