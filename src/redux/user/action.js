import {
  createUsers as createUserService,
  updateUsers as updateUserService,
  deleteUsers as deleteUserService,
  getUsersList as getUsersListService,
  getSpecificUsers as getSpecificUserService,
} from "./service";

export const userActions = {
  CREATE_USER_REQUEST: "user/create-user-request",
  CREATE_USER_SUCCESS: "user/create-user-success",
  CREATE_USER_FAILURE: "user/create-user-failure",
  UPDATE_USER_REQUEST: "user/update-user-request",
  UPDATE_USER_SUCCESS: "user/update-user-success",
  UPDATE_USER_FAILURE: "user/update-user-failure",
  DELETE_USER_REQUEST: "user/delete-user-request",
  DELETE_USER_SUCCESS: "user/delete-user-success",
  DELETE_USER_FAILURE: "user/delete-user-failure",
  GET_USERS_LIST_REQUEST: "user/get-users-list-request",
  GET_USERS_LIST_SUCCESS: "user/get-users-list-success",
  GET_USERS_LIST_FAILURE: "user/get-users-list-failure",
  GET_SPECIFIC_USER_REQUEST: "user/get-specific-user-request",
  GET_SPECIFIC_USER_SUCCESS: "user/get-specific-user-success",
  GET_SPECIFIC_USER_FAILURE: "user/get-specific-user-failure",
};

export const createUserRequest = () => ({
  type: userActions.CREATE_USER_REQUEST,
});

export const createUserSuccess = (data) => ({
  type: userActions.CREATE_USER_SUCCESS,
  payload: data,
});

export const createUserFailure = (error) => ({
  type: userActions.CREATE_USER_FAILURE,
  error: error,
});

export const createUser = (data) => {
  return async (dispatch) => {
    dispatch(createUserRequest());
    try {
      const response = await createUserService(data);
      dispatch(createUserSuccess(response));
    } catch (error) {
      dispatch(createUserFailure(error));
    }
  };
};

export const updateUserRequest = () => ({
  type: userActions.UPDATE_USER_REQUEST,
});

export const updateUserSuccess = (data) => ({
  type: userActions.UPDATE_USER_SUCCESS,
  payload: data,
});

export const updateUserFailure = (error) => ({
  type: userActions.UPDATE_USER_FAILURE,
  error: error,
});

export const updateUser = (id, data) => {
  return async (dispatch) => {
    dispatch(updateUserRequest());
    try {
      const response = await updateUserService(id, data);
      dispatch(updateUserSuccess(response));
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
};

export const deleteUserRequest = () => ({
  type: userActions.DELETE_USER_REQUEST,
});

export const deleteUserSuccess = (data) => ({
  type: userActions.DELETE_USER_SUCCESS,
  payload: data,
});

export const deleteUserFailure = (error) => ({
  type: userActions.DELETE_USER_FAILURE,
  error: error,
});

export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch(deleteUserRequest());
    try {
      const response = await deleteUserService(id);
      dispatch(deleteUserSuccess(response));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
};

export const getUsersListRequest = () => ({
  type: userActions.GET_USERS_LIST_REQUEST,
});

export const getUsersListSuccess = (data) => ({
  type: userActions.GET_USERS_LIST_SUCCESS,
  payload: data,
});

export const getUsersListFailure = (error) => ({
  type: userActions.GET_USERS_LIST_FAILURE,
  error: error,
});

export const getUsersList = (params) => {
  return async (dispatch) => {
    dispatch(getUsersListRequest());
    try {
      const response = await getUsersListService(params);
      dispatch(getUsersListSuccess(response));
    } catch (error) {
      dispatch(getUsersListFailure(error));
    }
  };
};

export const getSpecificUserRequest = () => ({
  type: userActions.GET_SPECIFIC_USER_REQUEST,
});

export const getSpecificUserSuccess = (data) => ({
  type: userActions.GET_SPECIFIC_USER_SUCCESS,
  payload: data,
});

export const getSpecificUserFailure = (error) => ({
  type: userActions.GET_SPECIFIC_USER_FAILURE,
  error: error,
});

export const getSpecificUser = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificUserRequest());
    try {
      const response = await getSpecificUserService(id);
      dispatch(getSpecificUserSuccess(response));
    } catch (error) {
      dispatch(getSpecificUserFailure(error));
    }
  };
};

export default userActions;
