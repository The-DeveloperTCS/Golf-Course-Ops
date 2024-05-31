import {
  createCustomers as createCustomerService,
  updateCustomers as updateCustomerService,
  deleteCustomers as deleteCustomerService,
  getCustomersList as getCustomersListService,
  getSpecificCustomers as getSpecificCustomerService,
} from "./service";

const customerActions = {
  CREATE_CUSTOMER_REQUEST: "customer/create-customer-request",
  CREATE_CUSTOMER_SUCCESS: "customer/create-customer-success",
  CREATE_CUSTOMER_FAILURE: "customer/create-customer-failure",
  UPDATE_CUSTOMER_REQUEST: "customer/update-customer-request",
  UPDATE_CUSTOMER_SUCCESS: "customer/update-customer-success",
  UPDATE_CUSTOMER_FAILURE: "customer/update-customer-failure",
  DELETE_CUSTOMER_REQUEST: "customer/delete-customer-request",
  DELETE_CUSTOMER_SUCCESS: "customer/delete-customer-success",
  DELETE_CUSTOMER_FAILURE: "customer/delete-customer-failure",
  GET_CUSTOMER_LIST_REQUEST: "customer/get-customer-list-request",
  GET_CUSTOMER_LIST_SUCCESS: "customer/get-customer-list-success",
  GET_CUSTOMER_LIST_FAILURE: "customer/get-customer-list-failure",
  GET_SPECIFIC_CUSTOMER_REQUEST: "customer/get-specific-customer-request",
  GET_SPECIFIC_CUSTOMER_SUCCESS: "customer/get-specific-customer-success",
  GET_SPECIFIC_CUSTOMER_FAILURE: "customer/get-specific-customer-failure",
};

export const createCustomerRequest = () => ({
  type: customerActions.CREATE_CUSTOMER_REQUEST,
});

export const createCustomerSuccess = (data) => ({
  type: customerActions.CREATE_CUSTOMER_SUCCESS,
  payload: data,
});

export const createCustomerFailure = (error) => ({
  type: customerActions.CREATE_CUSTOMER_FAILURE,
  error: error,
});

export const createCustomer = (data) => {
  return async (dispatch) => {
    dispatch(createCustomerRequest());
    try {
      const response = await createCustomerService(data);
      dispatch(createCustomerSuccess(response));
    } catch (error) {
      dispatch(createCustomerFailure(error));
    }
  };
};

export const updateCustomerRequest = () => ({
  type: customerActions.UPDATE_CUSTOMER_REQUEST,
});

export const updateCustomerSuccess = (data) => ({
  type: customerActions.UPDATE_CUSTOMER_SUCCESS,
  payload: data,
});

export const updateCustomerFailure = (error) => ({
  type: customerActions.UPDATE_CUSTOMER_FAILURE,
  error: error,
});

export const updateCustomer = (id, data) => {
  return async (dispatch) => {
    dispatch(updateCustomerRequest());
    try {
      const response = await updateCustomerService(id, data);
      dispatch(updateCustomerSuccess(response));
    } catch (error) {
      dispatch(updateCustomerFailure(error));
    }
  };
};

export const deleteCustomerRequest = () => ({
  type: customerActions.DELETE_CUSTOMER_REQUEST,
});

export const deleteCustomerSuccess = (data) => ({
  type: customerActions.DELETE_CUSTOMER_SUCCESS,
  payload: data,
});

export const deleteCustomerFailure = (error) => ({
  type: customerActions.DELETE_CUSTOMER_FAILURE,
  error: error,
});

export const deleteCartItem = (id) => {
  return async (dispatch) => {
    dispatch(deleteCustomerRequest());
    try {
      const response = await deleteCustomerService(id);
      dispatch(deleteCustomerSuccess(response));
    } catch (error) {
      dispatch(deleteCustomerFailure(error));
    }
  };
};

export const getCustomerListRequest = () => ({
  type: customerActions.GET_CUSTOMER_LIST_REQUEST,
});

export const getCustomerListSuccess = (data) => ({
  type: customerActions.GET_CUSTOMER_LIST_SUCCESS,
  payload: data,
});

export const getCustomerListFailure = (error) => ({
  type: customerActions.GET_CUSTOMER_LIST_FAILURE,
  error: error,
});

export const getCustomerList = (params) => {
  return async (dispatch) => {
    dispatch(getCustomerListRequest());
    try {
      const response = await getCustomersListService(params);
      dispatch(getCustomerListSuccess(response));
    } catch (error) {
      dispatch(getCustomerListFailure(error));
    }
  };
};

export const getSpecificCustomerRequest = () => ({
  type: customerActions.GET_SPECIFIC_CUSTOMER_REQUEST,
});

export const getSpecificCustomerSuccess = (data) => ({
  type: customerActions.GET_SPECIFIC_CUSTOMER_SUCCESS,
  payload: data,
});

export const getSpecificCustomerFailure = (error) => ({
  type: customerActions.GET_SPECIFIC_CUSTOMER_FAILURE,
  error: error,
});

export const getSpecificCustomer = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificCustomerRequest());
    try {
      const response = await getSpecificCustomerService(id);
      dispatch(getSpecificCustomerSuccess(response));
    } catch (error) {
      dispatch(getSpecificCustomerFailure(error));
    }
  };
};

export default customerActions;
