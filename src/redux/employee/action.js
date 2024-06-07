import {
  createEmployee as createEmployeeService,
  updateEmployee as updateEmployeeService,
  deleteEmployee as deleteEmployeeService,
  getEmployeesList as getEmployeesListService,
  getSpecificEmployee as getSpecificEmployeeService,
} from "./service";

export const employeeActions = {
  CREATE_EMPLOYEE_REQUEST: "employee/create-employee-request",
  CREATE_EMPLOYEE_SUCCESS: "employee/create-employee-success",
  CREATE_EMPLOYEE_FAILURE: "employee/create-employee-failure",
  UPDATE_EMPLOYEE_REQUEST: "employee/update-employee-request",
  UPDATE_EMPLOYEE_SUCCESS: "employee/update-employee-success",
  UPDATE_EMPLOYEE_FAILURE: "employee/update-employee-failure",
  DELETE_EMPLOYEE_REQUEST: "employee/delete-employee-request",
  DELETE_EMPLOYEE_SUCCESS: "employee/delete-employee-success",
  DELETE_EMPLOYEE_FAILURE: "employee/delete-employee-failure",
  GET_EMPLOYEES_LIST_REQUEST: "employee/get-employees-list-request",
  GET_EMPLOYEES_LIST_SUCCESS: "employee/get-employees-list-success",
  GET_EMPLOYEES_LIST_FAILURE: "employee/get-employees-list-failure",
  GET_SPECIFIC_EMPLOYEE_REQUEST: "employee/get-specific-employee-request",
  GET_SPECIFIC_EMPLOYEE_SUCCESS: "employee/get-specific-employee-success",
  GET_SPECIFIC_EMPLOYEE_FAILURE: "employee/get-specific-employee-failure",
};

export const createEmployeeRequest = () => ({
  type: employeeActions.CREATE_EMPLOYEE_REQUEST,
});

export const createEmployeeSuccess = (data) => ({
  type: employeeActions.CREATE_EMPLOYEE_SUCCESS,
  payload: data,
});

export const createEmployeeFailure = (error) => ({
  type: employeeActions.CREATE_EMPLOYEE_FAILURE,
  error: error,
});

export const createEmployee = (data) => {
  return async (dispatch) => {
    dispatch(createEmployeeRequest());
    try {
      console.log("Data being sent to service:", data);
      const response = await createEmployeeService(data);
      console.log("Response from service:", response);
      dispatch(createEmployeeSuccess(response));
    } catch (error) {
      console.error("Error in creating employee:", error);
      dispatch(createEmployeeFailure(error));
    }
  };
};

export const updateEmployeeRequest = () => ({
  type: employeeActions.UPDATE_EMPLOYEE_REQUEST,
});

export const updateEmployeeSuccess = (data) => ({
  type: employeeActions.UPDATE_EMPLOYEE_SUCCESS,
  payload: data,
});

export const updateEmployeeFailure = (error) => ({
  type: employeeActions.UPDATE_EMPLOYEE_FAILURE,
  error: error,
});

export const updateEmployee = (id, data) => {
  return async (dispatch) => {
    dispatch(updateEmployeeRequest());
    try {
      const response = await updateEmployeeService(id, data);
      dispatch(updateEmployeeSuccess(response));
    } catch (error) {
      dispatch(updateEmployeeFailure(error));
    }
  };
};

export const deleteEmployeeRequest = () => ({
  type: employeeActions.DELETE_EMPLOYEE_REQUEST,
});

export const deleteEmployeeSuccess = (data) => ({
  type: employeeActions.DELETE_EMPLOYEE_SUCCESS,
  payload: data,
});

export const deleteEmployeeFailure = (error) => ({
  type: employeeActions.DELETE_EMPLOYEE_FAILURE,
  error: error,
});

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    dispatch(deleteEmployeeRequest());
    try {
      const response = await deleteEmployeeService(id);
      dispatch(deleteEmployeeSuccess(response));
    } catch (error) {
      dispatch(deleteEmployeeFailure(error));
    }
  };
};

export const getEmployeesListRequest = () => ({
  type: employeeActions.GET_EMPLOYEES_LIST_REQUEST,
});

export const getEmployeesListSuccess = (data) => ({
  type: employeeActions.GET_EMPLOYEES_LIST_SUCCESS,
  payload: data,
});

export const getEmployeesListFailure = (error) => ({
  type: employeeActions.GET_EMPLOYEES_LIST_FAILURE,
  error: error,
});

export const getEmployeesList = (params) => {
  return async (dispatch) => {
    dispatch(getEmployeesListRequest());
    try {
      const response = await getEmployeesListService(params);
      dispatch(getEmployeesListSuccess(response));
    } catch (error) {
      dispatch(getEmployeesListFailure(error));
    }
  };
};

export const getSpecificEmployeeRequest = () => ({
  type: employeeActions.GET_SPECIFIC_EMPLOYEE_REQUEST,
});

export const getSpecificEmployeeSuccess = (data) => ({
  type: employeeActions.GET_SPECIFIC_EMPLOYEE_SUCCESS,
  payload: data,
});

export const getSpecificEmployeeFailure = (error) => ({
  type: employeeActions.GET_SPECIFIC_EMPLOYEE_FAILURE,
  error: error,
});

export const getSpecificEmployee = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificEmployeeRequest());
    try {
      const response = await getSpecificEmployeeService(id);
      dispatch(getSpecificEmployeeSuccess(response));
    } catch (error) {
      dispatch(getSpecificEmployeeFailure(error));
    }
  };
};
