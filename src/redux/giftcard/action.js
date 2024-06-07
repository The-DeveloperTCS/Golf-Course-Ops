import {
  createGiftcard as createGiftcardService,
  updateGiftcard as updateGiftcardService,
  deleteGiftcard as deleteGiftcardService,
  getGiftcardsList as getGiftcardsListService,
  getSpecificGiftcard as getSpecificGiftcardService,
} from "./service";

const giftcardActions = {
  CREATE_GIFTCARD_REQUEST: "giftcard/create-giftcard-request",
  CREATE_GIFTCARD_SUCCESS: "giftcard/create-giftcard-success",
  CREATE_GIFTCARD_FAILURE: "giftcard/create-giftcard-failure",
  UPDATE_GIFTCARD_REQUEST: "giftcard/update-giftcard-request",
  UPDATE_GIFTCARD_SUCCESS: "giftcard/update-giftcard-success",
  UPDATE_GIFTCARD_FAILURE: "giftcard/update-giftcard-failure",
  DELETE_GIFTCARD_REQUEST: "giftcard/delete-giftcard-request",
  DELETE_GIFTCARD_SUCCESS: "giftcard/delete-giftcard-success",
  DELETE_GIFTCARD_FAILURE: "giftcard/delete-giftcard-failure",
  GET_GIFTCARDS_LIST_REQUEST: "giftcard/get-giftcards-list-request",
  GET_GIFTCARDS_LIST_SUCCESS: "giftcard/get-giftcards-list-success",
  GET_GIFTCARDS_LIST_FAILURE: "giftcard/get-giftcards-list-failure",
  GET_SPECIFIC_GIFTCARD_REQUEST: "giftcard/get-specific-giftcard-request",
  GET_SPECIFIC_GIFTCARD_SUCCESS: "giftcard/get-specific-giftcard-success",
  GET_SPECIFIC_GIFTCARD_FAILURE: "giftcard/get-specific-giftcard-failure",
};

export const createGiftcardRequest = () => ({
  type: giftcardActions.CREATE_GIFTCARD_REQUEST,
});

export const createGiftcardSuccess = (data) => ({
  type: giftcardActions.CREATE_GIFTCARD_SUCCESS,
  payload: data,
});

export const createGiftcardFailure = (error) => ({
  type: giftcardActions.CREATE_GIFTCARD_FAILURE,
  error: error,
});

export const createGiftcard = (data) => {
  return async (dispatch) => {
    dispatch(createGiftcardRequest());
    try {
      const response = await createGiftcardService(data);
      dispatch(createGiftcardSuccess(response));
    } catch (error) {
      dispatch(createGiftcardFailure(error));
    }
  };
};

export const updateGiftcardRequest = () => ({
  type: giftcardActions.UPDATE_GIFTCARD_REQUEST,
});

export const updateGiftcardSuccess = (data) => ({
  type: giftcardActions.UPDATE_GIFTCARD_SUCCESS,
  payload: data,
});

export const updateGiftcardFailure = (error) => ({
  type: giftcardActions.UPDATE_GIFTCARD_FAILURE,
  error: error,
});

export const updateGiftcard = (id, data) => {
  return async (dispatch) => {
    dispatch(updateGiftcardRequest());
    try {
      const response = await updateGiftcardService(id, data);
      dispatch(updateGiftcardSuccess(response));
    } catch (error) {
      dispatch(updateGiftcardFailure(error));
    }
  };
};

export const deleteGiftcardRequest = () => ({
  type: giftcardActions.DELETE_GIFTCARD_REQUEST,
});

export const deleteGiftcardSuccess = (data) => ({
  type: giftcardActions.DELETE_GIFTCARD_SUCCESS,
  payload: data,
});

export const deleteGiftcardFailure = (error) => ({
  type: giftcardActions.DELETE_GIFTCARD_FAILURE,
  error: error,
});

export const deleteGiftcard = (id) => {
  return async (dispatch) => {
    dispatch(deleteGiftcardRequest());
    try {
      const response = await deleteGiftcardService(id);
      dispatch(deleteGiftcardSuccess(response));
    } catch (error) {
      dispatch(deleteGiftcardFailure(error));
    }
  };
};

export const getGiftcardsListRequest = () => ({
  type: giftcardActions.GET_GIFTCARDS_LIST_REQUEST,
});

export const getGiftcardsListSuccess = (data) => ({
  type: giftcardActions.GET_GIFTCARDS_LIST_SUCCESS,
  payload: data,
});

export const getGiftcardsListFailure = (error) => ({
  type: giftcardActions.GET_GIFTCARDS_LIST_FAILURE,
  error: error,
});

export const getGiftcardsList = (params) => {
  return async (dispatch) => {
    dispatch(getGiftcardsListRequest());
    try {
      const response = await getGiftcardsListService(params);
      dispatch(getGiftcardsListSuccess(response));
    } catch (error) {
      dispatch(getGiftcardsListFailure(error));
    }
  };
};

export const getSpecificGiftcardRequest = () => ({
  type: giftcardActions.GET_SPECIFIC_GIFTCARD_REQUEST,
});

export const getSpecificGiftcardSuccess = (data) => ({
  type: giftcardActions.GET_SPECIFIC_GIFTCARD_SUCCESS,
  payload: data,
});

export const getSpecificGiftcardFailure = (error) => ({
  type: giftcardActions.GET_SPECIFIC_GIFTCARD_FAILURE,
  error: error,
});

export const getSpecificGiftcard = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificGiftcardRequest());
    try {
      const response = await getSpecificGiftcardService(id);
      dispatch(getSpecificGiftcardSuccess(response));
    } catch (error) {
      dispatch(getSpecificGiftcardFailure(error));
    }
  };
};

export default giftcardActions;
