import {
  createRoles as createRoleService,
  updateRoles as updateRoleService,
  deleteRoles as deleteRoleService,
  getRolesList as getRolesListService,
  getSpecificRoles as getSpecificRoleService,
} from "./service";

export const roleActions = {
  CREATE_ROLE_REQUEST: "role/create-role-request",
  CREATE_ROLE_SUCCESS: "role/create-role-success",
  CREATE_ROLE_FAILURE: "role/create-role-failure",
  UPDATE_ROLE_REQUEST: "role/update-role-request",
  UPDATE_ROLE_SUCCESS: "role/update-role-success",
  UPDATE_ROLE_FAILURE: "role/update-role-failure",
  DELETE_ROLE_REQUEST: "role/delete-role-request",
  DELETE_ROLE_SUCCESS: "role/delete-role-success",
  DELETE_ROLE_FAILURE: "role/delete-role-failure",
  GET_ROLES_LIST_REQUEST: "role/get-roles-list-request",
  GET_ROLES_LIST_SUCCESS: "role/get-roles-list-success",
  GET_ROLES_LIST_FAILURE: "role/get-roles-list-failure",
  GET_SPECIFIC_ROLE_REQUEST: "role/get-specific-role-request",
  GET_SPECIFIC_ROLE_SUCCESS: "role/get-specific-role-success",
  GET_SPECIFIC_ROLE_FAILURE: "role/get-specific-role-failure",
};

export const createRoleRequest = () => ({
  type: roleActions.CREATE_ROLE_REQUEST,
});

export const createRoleSuccess = (data) => ({
  type: roleActions.CREATE_ROLE_SUCCESS,
  payload: data,
});

export const createRoleFailure = (error) => ({
  type: roleActions.CREATE_ROLE_FAILURE,
  error: error,
});

export const createRole = (data) => {
  return async (dispatch) => {
    dispatch(createRoleRequest());
    try {
      const response = await createRoleService(data);
      dispatch(createRoleSuccess(response));
    } catch (error) {
      dispatch(createRoleFailure(error));
    }
  };
};

export const updateRoleRequest = () => ({
  type: roleActions.UPDATE_ROLE_REQUEST,
});

export const updateRoleSuccess = (data) => ({
  type: roleActions.UPDATE_ROLE_SUCCESS,
  payload: data,
});

export const updateRoleFailure = (error) => ({
  type: roleActions.UPDATE_ROLE_FAILURE,
  error: error,
});

export const updateRole = (id, data) => {
  return async (dispatch) => {
    dispatch(updateRoleRequest());
    try {
      const response = await updateRoleService(id, data);
      dispatch(updateRoleSuccess(response));
    } catch (error) {
      dispatch(updateRoleFailure(error));
    }
  };
};

export const deleteRoleRequest = () => ({
  type: roleActions.DELETE_ROLE_REQUEST,
});

export const deleteRoleSuccess = (data) => ({
  type: roleActions.DELETE_ROLE_SUCCESS,
  payload: data,
});

export const deleteRoleFailure = (error) => ({
  type: roleActions.DELETE_ROLE_FAILURE,
  error: error,
});

export const deleteRole = (id) => {
  return async (dispatch) => {
    dispatch(deleteRoleRequest());
    try {
      const response = await deleteRoleService(id);
      dispatch(deleteRoleSuccess(response));
    } catch (error) {
      dispatch(deleteRoleFailure(error));
    }
  };
};

export const getRolesListRequest = () => ({
  type: roleActions.GET_ROLES_LIST_REQUEST,
});

export const getRolesListSuccess = (data) => ({
  type: roleActions.GET_ROLES_LIST_SUCCESS,
  payload: data,
});

export const getRolesListFailure = (error) => ({
  type: roleActions.GET_ROLES_LIST_FAILURE,
  error: error,
});

export const getRolesList = (params) => {
  return async (dispatch) => {
    dispatch(getRolesListRequest());
    try {
      const response = await getRolesListService(params);
      dispatch(getRolesListSuccess(response));
    } catch (error) {
      dispatch(getRolesListFailure(error));
    }
  };
};

export const getSpecificRoleRequest = () => ({
  type: roleActions.GET_SPECIFIC_ROLE_REQUEST,
});

export const getSpecificRoleSuccess = (data) => ({
  type: roleActions.GET_SPECIFIC_ROLE_SUCCESS,
  payload: data,
});

export const getSpecificRoleFailure = (error) => ({
  type: roleActions.GET_SPECIFIC_ROLE_FAILURE,
  error: error,
});

export const getSpecificRole = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificRoleRequest());
    try {
      const response = await getSpecificRoleService(id);
      dispatch(getSpecificRoleSuccess(response));
    } catch (error) {
      dispatch(getSpecificRoleFailure(error));
    }
  };
};

export default roleActions;
