import axios from "axios";
import { BaseUrl } from "Constants";

export const permissionActions = {
  CREATE_PERMISSION_REQUEST: "permission/create-permission-request",
  CREATE_PERMISSION_SUCCESS: "permission/create-permission-success",
  CREATE_PERMISSION_FAILURE: "permission/create-permission-failure",
  UPDATE_PERMISSION_REQUEST: "permission/update-permission-request",
  UPDATE_PERMISSION_SUCCESS: "permission/update-permission-success",
  UPDATE_PERMISSION_FAILURE: "permission/update-permission-failure",
  DELETE_PERMISSION_REQUEST: "permission/delete-permission-request",
  DELETE_PERMISSION_SUCCESS: "permission/delete-permission-success",
  DELETE_PERMISSION_FAILURE: "permission/delete-permission-failure",
  GET_PERMISSIONS_LIST_REQUEST: "permission/get-permissions-list-request",
  GET_PERMISSIONS_LIST_SUCCESS: "permission/get-permissions-list-success",
  GET_PERMISSIONS_LIST_FAILURE: "permission/get-permissions-list-failure",
  GET_SPECIFIC_PERMISSION_REQUEST: "permission/get-specific-permission-request",
  GET_SPECIFIC_PERMISSION_SUCCESS: "permission/get-specific-permission-success",
  GET_SPECIFIC_PERMISSION_FAILURE: "permission/get-specific-permission-failure",
};

export const createPermissionRequest = () => ({
  type: permissionActions.CREATE_PERMISSION_REQUEST,
});

export const createPermissionSuccess = (data) => ({
  type: permissionActions.CREATE_PERMISSION_SUCCESS,
  payload: data,
});

export const createPermissionFailure = (error) => ({
  type: permissionActions.CREATE_PERMISSION_FAILURE,
  error: error,
});

export const createPermission = (data) => {
  return async (dispatch) => {
    dispatch(createPermissionRequest());
    try {
      const response = await axios.post(`${BaseUrl}/permission/add`, data);
      dispatch(createPermissionSuccess(response.data));
    } catch (error) {
      dispatch(createPermissionFailure(error));
    }
  };
};

export const updatePermissionRequest = () => ({
  type: permissionActions.UPDATE_PERMISSION_REQUEST,
});

export const updatePermissionSuccess = (data) => ({
  type: permissionActions.UPDATE_PERMISSION_SUCCESS,
  payload: data,
});

export const updatePermissionFailure = (error) => ({
  type: permissionActions.UPDATE_PERMISSION_FAILURE,
  error: error,
});

export const updatePermission = (id, data) => {
  return async (dispatch) => {
    dispatch(updatePermissionRequest());
    try {
      const response = await axios.put(
        `${BaseUrl}/permission/update/${id}`,
        data
      );
      dispatch(updatePermissionSuccess(response.data));
    } catch (error) {
      dispatch(updatePermissionFailure(error));
    }
  };
};

export const deletePermissionRequest = () => ({
  type: permissionActions.DELETE_PERMISSION_REQUEST,
});

export const deletePermissionSuccess = (data) => ({
  type: permissionActions.DELETE_PERMISSION_SUCCESS,
  payload: data,
});

export const deletePermissionFailure = (error) => ({
  type: permissionActions.DELETE_PERMISSION_FAILURE,
  error: error,
});

export const deletePermission = (id) => {
  return async (dispatch) => {
    dispatch(deletePermissionRequest());
    try {
      const response = await axios.delete(`${BaseUrl}/permission/delete/${id}`);
      dispatch(deletePermissionSuccess(response.data));
    } catch (error) {
      dispatch(deletePermissionFailure(error));
    }
  };
};

export const getPermissionsListRequest = () => ({
  type: permissionActions.GET_PERMISSIONS_LIST_REQUEST,
});

export const getPermissionsListSuccess = (data) => ({
  type: permissionActions.GET_PERMISSIONS_LIST_SUCCESS,
  payload: data,
});

export const getPermissionsListFailure = (error) => ({
  type: permissionActions.GET_PERMISSIONS_LIST_FAILURE,
  error: error,
});

export const getPermissionsList = (params) => {
  return async (dispatch) => {
    dispatch(getPermissionsListRequest());
    try {
      const response = await axios.get(`${BaseUrl}/permission/getAll`, {
        params,
      });
      dispatch(getPermissionsListSuccess(response.data));
    } catch (error) {
      dispatch(getPermissionsListFailure(error));
    }
  };
};

export const getSpecificPermissionRequest = () => ({
  type: permissionActions.GET_SPECIFIC_PERMISSION_REQUEST,
});

export const getSpecificPermissionSuccess = (data) => ({
  type: permissionActions.GET_SPECIFIC_PERMISSION_SUCCESS,
  payload: data,
});

export const getSpecificPermissionFailure = (error) => ({
  type: permissionActions.GET_SPECIFIC_PERMISSION_FAILURE,
  error: error,
});

export const getSpecificPermission = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificPermissionRequest());
    try {
      const response = await axios.get(
        `${BaseUrl}/permission/specificId/${id}`
      );
      dispatch(getSpecificPermissionSuccess(response.data));
    } catch (error) {
      dispatch(getSpecificPermissionFailure(error));
    }
  };
};

export default permissionActions;
