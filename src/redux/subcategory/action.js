import axios from "axios";
import { BaseUrl } from "Constants";

export const subcategoryActions = {
  CREATE_SUBCATEGORY_REQUEST: "subcategory/create-subcategory-request",
  CREATE_SUBCATEGORY_SUCCESS: "subcategory/create-subcategory-success",
  CREATE_SUBCATEGORY_FAILURE: "subcategory/create-subcategory-failure",
  UPDATE_SUBCATEGORY_REQUEST: "subcategory/update-subcategory-request",
  UPDATE_SUBCATEGORY_SUCCESS: "subcategory/update-subcategory-success",
  UPDATE_SUBCATEGORY_FAILURE: "subcategory/update-subcategory-failure",
  DELETE_SUBCATEGORY_REQUEST: "subcategory/delete-subcategory-request",
  DELETE_SUBCATEGORY_SUCCESS: "subcategory/delete-subcategory-success",
  DELETE_SUBCATEGORY_FAILURE: "subcategory/delete-subcategory-failure",
  GET_SUBCATEGORIES_LIST_REQUEST: "subcategory/get-subcategories-list-request",
  GET_SUBCATEGORIES_LIST_SUCCESS: "subcategory/get-subcategories-list-success",
  GET_SUBCATEGORIES_LIST_FAILURE: "subcategory/get-subcategories-list-failure",
  GET_SPECIFIC_SUBCATEGORY_REQUEST:
    "subcategory/get-specific-subcategory-request",
  GET_SPECIFIC_SUBCATEGORY_SUCCESS:
    "subcategory/get-specific-subcategory-success",
  GET_SPECIFIC_SUBCATEGORY_FAILURE:
    "subcategory/get-specific-subcategory-failure",
};

export const createSubcategoryRequest = () => ({
  type: subcategoryActions.CREATE_SUBCATEGORY_REQUEST,
});

export const createSubcategorySuccess = (data) => ({
  type: subcategoryActions.CREATE_SUBCATEGORY_SUCCESS,
  payload: data,
});

export const createSubcategoryFailure = (error) => ({
  type: subcategoryActions.CREATE_SUBCATEGORY_FAILURE,
  error: error,
});

export const createSubcategory = (data) => {
  return async (dispatch) => {
    dispatch(createSubcategoryRequest());
    try {
      const response = await axios.post(`${BaseUrl}/subcategory/add`, data);
      dispatch(createSubcategorySuccess(response.data));
    } catch (error) {
      dispatch(createSubcategoryFailure(error));
    }
  };
};

export const updateSubcategoryRequest = () => ({
  type: subcategoryActions.UPDATE_SUBCATEGORY_REQUEST,
});

export const updateSubcategorySuccess = (data) => ({
  type: subcategoryActions.UPDATE_SUBCATEGORY_SUCCESS,
  payload: data,
});

export const updateSubcategoryFailure = (error) => ({
  type: subcategoryActions.UPDATE_SUBCATEGORY_FAILURE,
  error: error,
});

export const updateSubcategory = (id, data) => {
  return async (dispatch) => {
    dispatch(updateSubcategoryRequest());
    try {
      const response = await axios.put(
        `${BaseUrl}/subcategory/update/${id}`,
        data
      );
      dispatch(updateSubcategorySuccess(response.data));
    } catch (error) {
      dispatch(updateSubcategoryFailure(error));
    }
  };
};

export const deleteSubcategoryRequest = () => ({
  type: subcategoryActions.DELETE_SUBCATEGORY_REQUEST,
});

export const deleteSubcategorySuccess = (data) => ({
  type: subcategoryActions.DELETE_SUBCATEGORY_SUCCESS,
  payload: data,
});

export const deleteSubcategoryFailure = (error) => ({
  type: subcategoryActions.DELETE_SUBCATEGORY_FAILURE,
  error: error,
});

export const deleteSubcategory = (id) => {
  return async (dispatch) => {
    dispatch(deleteSubcategoryRequest());
    try {
      const response = await axios.delete(
        `${BaseUrl}/subcategory/delete/${id}`
      );
      dispatch(deleteSubcategorySuccess(response.data));
    } catch (error) {
      dispatch(deleteSubcategoryFailure(error));
    }
  };
};

export const getSubcategoriesListRequest = () => ({
  type: subcategoryActions.GET_SUBCATEGORIES_LIST_REQUEST,
});

export const getSubcategoriesListSuccess = (data) => ({
  type: subcategoryActions.GET_SUBCATEGORIES_LIST_SUCCESS,
  payload: data,
});

export const getSubcategoriesListFailure = (error) => ({
  type: subcategoryActions.GET_SUBCATEGORIES_LIST_FAILURE,
  error: error,
});

export const getSubcategoriesList = (params) => {
  return async (dispatch) => {
    dispatch(getSubcategoriesListRequest());
    try {
      const response = await axios.get(`${BaseUrl}/subcategory/getAll`, {
        params,
      });
      dispatch(getSubcategoriesListSuccess(response.data));
    } catch (error) {
      dispatch(getSubcategoriesListFailure(error));
    }
  };
};

export const getSpecificSubcategoryRequest = () => ({
  type: subcategoryActions.GET_SPECIFIC_SUBCATEGORY_REQUEST,
});

export const getSpecificSubcategorySuccess = (data) => ({
  type: subcategoryActions.GET_SPECIFIC_SUBCATEGORY_SUCCESS,
  payload: data,
});

export const getSpecificSubcategoryFailure = (error) => ({
  type: subcategoryActions.GET_SPECIFIC_SUBCATEGORY_FAILURE,
  error: error,
});

export const getSpecificSubcategory = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificSubcategoryRequest());
    try {
      const response = await axios.get(
        `${BaseUrl}/subcategory/specificId/${id}`
      );
      dispatch(getSpecificSubcategorySuccess(response.data));
    } catch (error) {
      dispatch(getSpecificSubcategoryFailure(error));
    }
  };
};
