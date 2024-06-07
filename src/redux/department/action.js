import {
  createDepartments as createDepartmentService,
  updateDepartments as updateDepartmentService,
  deleteDepartments as deleteDepartmentService,
  getDepartmentsList as getDepartmentsListService,
  getSpecificDepartments as getSpecificDepartmentService,
} from "./service";

const departmentActions = {
  CREATE_DEPARTMENT_REQUEST: "department/create-department-request",
  CREATE_DEPARTMENT_SUCCESS: "department/create-department-success",
  CREATE_DEPARTMENT_FAILURE: "department/create-department-failure",
  UPDATE_DEPARTMENT_REQUEST: "department/update-department-request",
  UPDATE_DEPARTMENT_SUCCESS: "department/update-department-success",
  UPDATE_DEPARTMENT_FAILURE: "department/update-department-failure",
  DELETE_DEPARTMENT_REQUEST: "department/delete-department-request",
  DELETE_DEPARTMENT_SUCCESS: "department/delete-department-success",
  DELETE_DEPARTMENT_FAILURE: "department/delete-department-failure",
  GET_DEPARTMENTS_LIST_REQUEST: "department/get-departments-list-request",
  GET_DEPARTMENTS_LIST_SUCCESS: "department/get-departments-list-success",
  GET_DEPARTMENTS_LIST_FAILURE: "department/get-departments-list-failure",
  GET_SPECIFIC_DEPARTMENT_REQUEST: "department/get-specific-department-request",
  GET_SPECIFIC_DEPARTMENT_SUCCESS: "department/get-specific-department-success",
  GET_SPECIFIC_DEPARTMENT_FAILURE: "department/get-specific-department-failure",
};

export const createDepartmentRequest = () => ({
  type: departmentActions.CREATE_DEPARTMENT_REQUEST,
});

export const createDepartmentSuccess = (data) => ({
  type: departmentActions.CREATE_DEPARTMENT_SUCCESS,
  payload: data,
});

export const createDepartmentFailure = (error) => ({
  type: departmentActions.CREATE_DEPARTMENT_FAILURE,
  error: error,
});

export const createDepartment = (data) => {
  return async (dispatch) => {
    dispatch(createDepartmentRequest());
    try {
      const response = await createDepartmentService(data);
      dispatch(createDepartmentSuccess(response));
    } catch (error) {
      dispatch(createDepartmentFailure(error));
    }
  };
};

export const updateDepartmentRequest = () => ({
  type: departmentActions.UPDATE_DEPARTMENT_REQUEST,
});

export const updateDepartmentSuccess = (data) => ({
  type: departmentActions.UPDATE_DEPARTMENT_SUCCESS,
  payload: data,
});

export const updateDepartmentFailure = (error) => ({
  type: departmentActions.UPDATE_DEPARTMENT_FAILURE,
  error: error,
});

export const updateDepartment = (id, data) => {
  return async (dispatch) => {
    dispatch(updateDepartmentRequest());
    try {
      const response = await updateDepartmentService(id, data);
      dispatch(updateDepartmentSuccess(response));
    } catch (error) {
      dispatch(updateDepartmentFailure(error));
    }
  };
};

export const deleteDepartmentRequest = () => ({
  type: departmentActions.DELETE_DEPARTMENT_REQUEST,
});

export const deleteDepartmentSuccess = (data) => ({
  type: departmentActions.DELETE_DEPARTMENT_SUCCESS,
  payload: data,
});

export const deleteDepartmentFailure = (error) => ({
  type: departmentActions.DELETE_DEPARTMENT_FAILURE,
  error: error,
});

export const deleteDepartment = (id) => {
  return async (dispatch) => {
    dispatch(deleteDepartmentRequest());
    try {
      const response = await deleteDepartmentService(id);
      dispatch(deleteDepartmentSuccess(response));
    } catch (error) {
      dispatch(deleteDepartmentFailure(error));
    }
  };
};

export const getDepartmentsListRequest = () => ({
  type: departmentActions.GET_DEPARTMENTS_LIST_REQUEST,
});

export const getDepartmentsListSuccess = (data) => ({
  type: departmentActions.GET_DEPARTMENTS_LIST_SUCCESS,
  payload: data,
});

export const getDepartmentsListFailure = (error) => ({
  type: departmentActions.GET_DEPARTMENTS_LIST_FAILURE,
  error: error,
});

export const getDepartmentsList = (params) => {
  return async (dispatch) => {
    dispatch(getDepartmentsListRequest());
    try {
      const response = await getDepartmentsListService(params);
      dispatch(getDepartmentsListSuccess(response));
    } catch (error) {
      dispatch(getDepartmentsListFailure(error));
    }
  };
};

export const getSpecificDepartmentRequest = () => ({
  type: departmentActions.GET_SPECIFIC_DEPARTMENT_REQUEST,
});

export const getSpecificDepartmentSuccess = (data) => ({
  type: departmentActions.GET_SPECIFIC_DEPARTMENT_SUCCESS,
  payload: data,
});

export const getSpecificDepartmentFailure = (error) => ({
  type: departmentActions.GET_SPECIFIC_DEPARTMENT_FAILURE,
  error: error,
});

export const getSpecificDepartment = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificDepartmentRequest());
    try {
      const response = await getSpecificDepartmentService(id);
      dispatch(getSpecificDepartmentSuccess(response));
    } catch (error) {
      dispatch(getSpecificDepartmentFailure(error));
    }
  };
};

export default departmentActions;
