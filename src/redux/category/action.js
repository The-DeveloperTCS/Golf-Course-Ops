import {
  createCategories as createCategoryService,
  updateCategories as updateCategoryService,
  deleteCategories as deleteCategoryService,
  getCategoriesList as getCategoriesListService,
  getSpecificCategories as getSpecificCategoryService,
} from "./service";

export const categoryActions = {
  CREATE_CATEGORY_REQUEST: "category/create-category-request",
  CREATE_CATEGORY_SUCCESS: "category/create-category-success",
  CREATE_CATEGORY_FAILURE: "category/create-category-failure",
  UPDATE_CATEGORY_REQUEST: "category/update-category-request",
  UPDATE_CATEGORY_SUCCESS: "category/update-category-success",
  UPDATE_CATEGORY_FAILURE: "category/update-category-failure",
  DELETE_CATEGORY_REQUEST: "category/delete-category-request",
  DELETE_CATEGORY_SUCCESS: "category/delete-category-success",
  DELETE_CATEGORY_FAILURE: "category/delete-category-failure",
  GET_CATEGORIES_LIST_REQUEST: "category/get-categories-list-request",
  GET_CATEGORIES_LIST_SUCCESS: "category/get-categories-list-success",
  GET_CATEGORIES_LIST_FAILURE: "category/get-categories-list-failure",
  GET_SPECIFIC_CATEGORY_REQUEST: "category/get-specific-category-request",
  GET_SPECIFIC_CATEGORY_SUCCESS: "category/get-specific-category-success",
  GET_SPECIFIC_CATEGORY_FAILURE: "category/get-specific-category-failure",
};

export const createCategoryRequest = () => ({
  type: categoryActions.CREATE_CATEGORY_REQUEST,
});

export const createCategorySuccess = (data) => ({
  type: categoryActions.CREATE_CATEGORY_SUCCESS,
  payload: data,
});

export const createCategoryFailure = (error) => ({
  type: categoryActions.CREATE_CATEGORY_FAILURE,
  error: error,
});

export const createCategory = (data) => {
  return async (dispatch) => {
    dispatch(createCategoryRequest());
    try {
      const response = await createCategoryService(data);
      dispatch(createCategorySuccess(response));
    } catch (error) {
      dispatch(createCategoryFailure(error));
    }
  };
};

export const updateCategoryRequest = () => ({
  type: categoryActions.UPDATE_CATEGORY_REQUEST,
});

export const updateCategorySuccess = (data) => ({
  type: categoryActions.UPDATE_CATEGORY_SUCCESS,
  payload: data,
});

export const updateCategoryFailure = (error) => ({
  type: categoryActions.UPDATE_CATEGORY_FAILURE,
  error: error,
});

export const updateCategory = (id, data) => {
  return async (dispatch) => {
    dispatch(updateCategoryRequest());
    try {
      const response = await updateCategoryService(id, data);
      dispatch(updateCategorySuccess(response));
    } catch (error) {
      dispatch(updateCategoryFailure(error));
    }
  };
};

export const deleteCategoryRequest = () => ({
  type: categoryActions.DELETE_CATEGORY_REQUEST,
});

export const deleteCategorySuccess = (data) => ({
  type: categoryActions.DELETE_CATEGORY_SUCCESS,
  payload: data,
});

export const deleteCategoryFailure = (error) => ({
  type: categoryActions.DELETE_CATEGORY_FAILURE,
  error: error,
});

export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch(deleteCategoryRequest());
    try {
      const response = await deleteCategoryService(id);
      dispatch(deleteCategorySuccess(response));
    } catch (error) {
      dispatch(deleteCategoryFailure(error));
    }
  };
};

export const getCategoriesListRequest = () => ({
  type: categoryActions.GET_CATEGORIES_LIST_REQUEST,
});

export const getCategoriesListSuccess = (data) => ({
  type: categoryActions.GET_CATEGORIES_LIST_SUCCESS,
  payload: data,
});

export const getCategoriesListFailure = (error) => ({
  type: categoryActions.GET_CATEGORIES_LIST_FAILURE,
  error: error,
});

export const getCategoriesList = (params) => {
  return async (dispatch) => {
    dispatch(getCategoriesListRequest());
    try {
      const response = await getCategoriesListService(params);
      dispatch(getCategoriesListSuccess(response));
    } catch (error) {
      dispatch(getCategoriesListFailure(error));
    }
  };
};

export const getSpecificCategoryRequest = () => ({
  type: categoryActions.GET_SPECIFIC_CATEGORY_REQUEST,
});

export const getSpecificCategorySuccess = (data) => ({
  type: categoryActions.GET_SPECIFIC_CATEGORY_SUCCESS,
  payload: data,
});

export const getSpecificCategoryFailure = (error) => ({
  type: categoryActions.GET_SPECIFIC_CATEGORY_FAILURE,
  error: error,
});

export const getSpecificCategory = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificCategoryRequest());
    try {
      const response = await getSpecificCategoryService(id);
      dispatch(getSpecificCategorySuccess(response));
    } catch (error) {
      dispatch(getSpecificCategoryFailure(error));
    }
  };
};
