import axios from "axios";
import { BaseUrl } from "Constants";

export const supplierActions = {
  CREATE_SUPPLIER_REQUEST: "supplier/create-supplier-request",
  CREATE_SUPPLIER_SUCCESS: "supplier/create-supplier-success",
  CREATE_SUPPLIER_FAILURE: "supplier/create-supplier-failure",
  UPDATE_SUPPLIER_REQUEST: "supplier/update-supplier-request",
  UPDATE_SUPPLIER_SUCCESS: "supplier/update-supplier-success",
  UPDATE_SUPPLIER_FAILURE: "supplier/update-supplier-failure",
  DELETE_SUPPLIER_REQUEST: "supplier/delete-supplier-request",
  DELETE_SUPPLIER_SUCCESS: "supplier/delete-supplier-success",
  DELETE_SUPPLIER_FAILURE: "supplier/delete-supplier-failure",
  GET_SUPPLIERS_LIST_REQUEST: "supplier/get-suppliers-list-request",
  GET_SUPPLIERS_LIST_SUCCESS: "supplier/get-suppliers-list-success",
  GET_SUPPLIERS_LIST_FAILURE: "supplier/get-suppliers-list-failure",
  GET_SPECIFIC_SUPPLIER_REQUEST: "supplier/get-specific-supplier-request",
  GET_SPECIFIC_SUPPLIER_SUCCESS: "supplier/get-specific-supplier-success",
  GET_SPECIFIC_SUPPLIER_FAILURE: "supplier/get-specific-supplier-failure",
};

export const createSupplierRequest = () => ({
  type: supplierActions.CREATE_SUPPLIER_REQUEST,
});

export const createSupplierSuccess = (data) => ({
  type: supplierActions.CREATE_SUPPLIER_SUCCESS,
  payload: data,
});

export const createSupplierFailure = (error) => ({
  type: supplierActions.CREATE_SUPPLIER_FAILURE,
  error: error,
});

export const createSupplier = (data) => {
  return async (dispatch) => {
    dispatch(createSupplierRequest());
    try {
      const response = await axios.post(`${BaseUrl}/supplier/add`, data);
      dispatch(createSupplierSuccess(response.data));
    } catch (error) {
      dispatch(createSupplierFailure(error));
    }
  };
};

export const updateSupplierRequest = () => ({
  type: supplierActions.UPDATE_SUPPLIER_REQUEST,
});

export const updateSupplierSuccess = (data) => ({
  type: supplierActions.UPDATE_SUPPLIER_SUCCESS,
  payload: data,
});

export const updateSupplierFailure = (error) => ({
  type: supplierActions.UPDATE_SUPPLIER_FAILURE,
  error: error,
});

export const updateSupplier = (id, data) => {
  return async (dispatch) => {
    dispatch(updateSupplierRequest());
    try {
      const response = await axios.put(
        `${BaseUrl}/supplier/update/${id}`,
        data
      );
      dispatch(updateSupplierSuccess(response.data));
    } catch (error) {
      dispatch(updateSupplierFailure(error));
    }
  };
};

export const deleteSupplierRequest = () => ({
  type: supplierActions.DELETE_SUPPLIER_REQUEST,
});

export const deleteSupplierSuccess = (data) => ({
  type: supplierActions.DELETE_SUPPLIER_SUCCESS,
  payload: data,
});

export const deleteSupplierFailure = (error) => ({
  type: supplierActions.DELETE_SUPPLIER_FAILURE,
  error: error,
});

export const deleteSupplier = (id) => {
  return async (dispatch) => {
    dispatch(deleteSupplierRequest());
    try {
      const response = await axios.delete(`${BaseUrl}/supplier/delete/${id}`);
      dispatch(deleteSupplierSuccess(response.data));
    } catch (error) {
      dispatch(deleteSupplierFailure(error));
    }
  };
};

export const getSuppliersListRequest = () => ({
  type: supplierActions.GET_SUPPLIERS_LIST_REQUEST,
});

export const getSuppliersListSuccess = (data) => ({
  type: supplierActions.GET_SUPPLIERS_LIST_SUCCESS,
  payload: data,
});

export const getSuppliersListFailure = (error) => ({
  type: supplierActions.GET_SUPPLIERS_LIST_FAILURE,
  error: error,
});

export const getSuppliersList = (params) => {
  return async (dispatch) => {
    dispatch(getSuppliersListRequest());
    try {
      const response = await axios.get(`${BaseUrl}/supplier/getAll`, {
        params,
      });
      dispatch(getSuppliersListSuccess(response.data));
    } catch (error) {
      dispatch(getSuppliersListFailure(error));
    }
  };
};

export const getSpecificSupplierRequest = () => ({
  type: supplierActions.GET_SPECIFIC_SUPPLIER_REQUEST,
});

export const getSpecificSupplierSuccess = (data) => ({
  type: supplierActions.GET_SPECIFIC_SUPPLIER_SUCCESS,
  payload: data,
});

export const getSpecificSupplierFailure = (error) => ({
  type: supplierActions.GET_SPECIFIC_SUPPLIER_FAILURE,
  error: error,
});

export const getSpecificSupplier = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificSupplierRequest());
    try {
      const response = await axios.get(`${BaseUrl}/supplier/specificId/${id}`);
      dispatch(getSpecificSupplierSuccess(response.data));
    } catch (error) {
      dispatch(getSpecificSupplierFailure(error));
    }
  };
};

export default supplierActions;
