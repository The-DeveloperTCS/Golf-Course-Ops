import {
  createGroup as createGroupService,
  updateGroup as updateGroupService,
  deleteGroup as deleteGroupService,
  getGroupsList as getGroupsListService,
  getSpecificGroup as getSpecificGroupService,
} from "./service";

export const groupActions = {
  CREATE_GROUP_REQUEST: "group/create-group-request",
  CREATE_GROUP_SUCCESS: "group/create-group-success",
  CREATE_GROUP_FAILURE: "group/create-group-failure",
  UPDATE_GROUP_REQUEST: "group/update-group-request",
  UPDATE_GROUP_SUCCESS: "group/update-group-success",
  UPDATE_GROUP_FAILURE: "group/update-group-failure",
  DELETE_GROUP_REQUEST: "group/delete-group-request",
  DELETE_GROUP_SUCCESS: "group/delete-group-success",
  DELETE_GROUP_FAILURE: "group/delete-group-failure",
  GET_GROUPS_LIST_REQUEST: "group/get-groups-list-request",
  GET_GROUPS_LIST_SUCCESS: "group/get-groups-list-success",
  GET_GROUPS_LIST_FAILURE: "group/get-groups-list-failure",
  GET_SPECIFIC_GROUP_REQUEST: "group/get-specific-group-request",
  GET_SPECIFIC_GROUP_SUCCESS: "group/get-specific-group-success",
  GET_SPECIFIC_GROUP_FAILURE: "group/get-specific-group-failure",
};

export const createGroupRequest = () => ({
  type: groupActions.CREATE_GROUP_REQUEST,
});

export const createGroupSuccess = (data) => ({
  type: groupActions.CREATE_GROUP_SUCCESS,
  payload: data,
});

export const createGroupFailure = (error) => ({
  type: groupActions.CREATE_GROUP_FAILURE,
  error: error,
});

export const createGroup = (data) => {
  return async (dispatch) => {
    dispatch(createGroupRequest());
    try {
      const response = await createGroupService(data);
      dispatch(createGroupSuccess(response));
    } catch (error) {
      dispatch(createGroupFailure(error));
    }
  };
};

export const updateGroupRequest = () => ({
  type: groupActions.UPDATE_GROUP_REQUEST,
});

export const updateGroupSuccess = (data) => ({
  type: groupActions.UPDATE_GROUP_SUCCESS,
  payload: data,
});

export const updateGroupFailure = (error) => ({
  type: groupActions.UPDATE_GROUP_FAILURE,
  error: error,
});

export const updateGroup = (id, data) => {
  return async (dispatch) => {
    dispatch(updateGroupRequest());
    try {
      const response = await updateGroupService(id, data);
      dispatch(updateGroupSuccess(response));
    } catch (error) {
      dispatch(updateGroupFailure(error));
    }
  };
};

export const deleteGroupRequest = () => ({
  type: groupActions.DELETE_GROUP_REQUEST,
});

export const deleteGroupSuccess = (data) => ({
  type: groupActions.DELETE_GROUP_SUCCESS,
  payload: data,
});

export const deleteGroupFailure = (error) => ({
  type: groupActions.DELETE_GROUP_FAILURE,
  error: error,
});

export const deleteGroup = (id) => {
  return async (dispatch) => {
    dispatch(deleteGroupRequest());
    try {
      const response = await deleteGroupService(id);
      dispatch(deleteGroupSuccess(response));
    } catch (error) {
      dispatch(deleteGroupFailure(error));
    }
  };
};

export const getGroupsListRequest = () => ({
  type: groupActions.GET_GROUPS_LIST_REQUEST,
});

export const getGroupsListSuccess = (data) => ({
  type: groupActions.GET_GROUPS_LIST_SUCCESS,
  payload: data,
});

export const getGroupsListFailure = (error) => ({
  type: groupActions.GET_GROUPS_LIST_FAILURE,
  error: error,
});

export const getGroupsList = (params) => {
  return async (dispatch) => {
    dispatch(getGroupsListRequest());
    try {
      const response = await getGroupsListService(params);
      dispatch(getGroupsListSuccess(response));
    } catch (error) {
      dispatch(getGroupsListFailure(error));
    }
  };
};

export const getSpecificGroupRequest = () => ({
  type: groupActions.GET_SPECIFIC_GROUP_REQUEST,
});

export const getSpecificGroupSuccess = (data) => ({
  type: groupActions.GET_SPECIFIC_GROUP_SUCCESS,
  payload: data,
});

export const getSpecificGroupFailure = (error) => ({
  type: groupActions.GET_SPECIFIC_GROUP_FAILURE,
  error: error,
});

export const getSpecificGroup = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificGroupRequest());
    try {
      const response = await getSpecificGroupService(id);
      dispatch(getSpecificGroupSuccess(response));
    } catch (error) {
      dispatch(getSpecificGroupFailure(error));
    }
  };
};

export default groupActions;
