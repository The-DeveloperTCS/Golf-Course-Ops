import {
  createInventory as createInventoryService,
  updateInventory as updateInventoryService,
  deleteInventory as deleteInventoryService,
  getInventoriesList as getInventoriesListService,
  getSpecificInventory as getSpecificInventoryService,
} from "./service";

const inventoryActions = {
  CREATE_INVENTORY_REQUEST: "inventory/create-inventory-request",
  CREATE_INVENTORY_SUCCESS: "inventory/create-inventory-success",
  CREATE_INVENTORY_FAILURE: "inventory/create-inventory-failure",
  UPDATE_INVENTORY_REQUEST: "inventory/update-inventory-request",
  UPDATE_INVENTORY_SUCCESS: "inventory/update-inventory-success",
  UPDATE_INVENTORY_FAILURE: "inventory/update-inventory-failure",
  DELETE_INVENTORY_REQUEST: "inventory/delete-inventory-request",
  DELETE_INVENTORY_SUCCESS: "inventory/delete-inventory-success",
  DELETE_INVENTORY_FAILURE: "inventory/delete-inventory-failure",
  GET_INVENTORIES_LIST_REQUEST: "inventory/get-inventories-list-request",
  GET_INVENTORIES_LIST_SUCCESS: "inventory/get-inventories-list-success",
  GET_INVENTORIES_LIST_FAILURE: "inventory/get-inventories-list-failure",
  GET_SPECIFIC_INVENTORY_REQUEST: "inventory/get-specific-inventory-request",
  GET_SPECIFIC_INVENTORY_SUCCESS: "inventory/get-specific-inventory-success",
  GET_SPECIFIC_INVENTORY_FAILURE: "inventory/get-specific-inventory-failure",
};

export const createInventoryRequest = () => ({
  type: inventoryActions.CREATE_INVENTORY_REQUEST,
});

export const createInventorySuccess = (data) => ({
  type: inventoryActions.CREATE_INVENTORY_SUCCESS,
  payload: data,
});

export const createInventoryFailure = (error) => ({
  type: inventoryActions.CREATE_INVENTORY_FAILURE,
  error: error,
});

export const createInventory = (data) => {
  return async (dispatch) => {
    dispatch(createInventoryRequest());
    try {
      const response = await createInventoryService(data);
      dispatch(createInventorySuccess(response));
    } catch (error) {
      dispatch(createInventoryFailure(error));
    }
  };
};

export const updateInventoryRequest = () => ({
  type: inventoryActions.UPDATE_INVENTORY_REQUEST,
});

export const updateInventorySuccess = (data) => ({
  type: inventoryActions.UPDATE_INVENTORY_SUCCESS,
  payload: data,
});

export const updateInventoryFailure = (error) => ({
  type: inventoryActions.UPDATE_INVENTORY_FAILURE,
  error: error,
});

export const updateInventory = (id, data) => {
  return async (dispatch) => {
    dispatch(updateInventoryRequest());
    try {
      const response = await updateInventoryService(id, data);
      dispatch(updateInventorySuccess(response));
    } catch (error) {
      dispatch(updateInventoryFailure(error));
    }
  };
};

export const deleteInventoryRequest = () => ({
  type: inventoryActions.DELETE_INVENTORY_REQUEST,
});

export const deleteInventorySuccess = (data) => ({
  type: inventoryActions.DELETE_INVENTORY_SUCCESS,
  payload: data,
});

export const deleteInventoryFailure = (error) => ({
  type: inventoryActions.DELETE_INVENTORY_FAILURE,
  error: error,
});

export const deleteInventory = (id) => {
  return async (dispatch) => {
    dispatch(deleteInventoryRequest());
    try {
      const response = await deleteInventoryService(id);
      dispatch(deleteInventorySuccess(response));
    } catch (error) {
      dispatch(deleteInventoryFailure(error));
    }
  };
};

export const getInventoriesListRequest = () => ({
  type: inventoryActions.GET_INVENTORIES_LIST_REQUEST,
});

export const getInventoriesListSuccess = (data) => ({
  type: inventoryActions.GET_INVENTORIES_LIST_SUCCESS,
  payload: data,
});

export const getInventoriesListFailure = (error) => ({
  type: inventoryActions.GET_INVENTORIES_LIST_FAILURE,
  error: error,
});

export const getInventoriesList = (params) => {
  return async (dispatch) => {
    dispatch(getInventoriesListRequest());
    try {
      const response = await getInventoriesListService(params);
      dispatch(getInventoriesListSuccess(response));
    } catch (error) {
      dispatch(getInventoriesListFailure(error));
    }
  };
};

export const getSpecificInventoryRequest = () => ({
  type: inventoryActions.GET_SPECIFIC_INVENTORY_REQUEST,
});

export const getSpecificInventorySuccess = (data) => ({
  type: inventoryActions.GET_SPECIFIC_INVENTORY_SUCCESS,
  payload: data,
});

export const getSpecificInventoryFailure = (error) => ({
  type: inventoryActions.GET_SPECIFIC_INVENTORY_FAILURE,
  error: error,
});

export const getSpecificInventory = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificInventoryRequest());
    try {
      const response = await getSpecificInventoryService(id);
      dispatch(getSpecificInventorySuccess(response));
    } catch (error) {
      dispatch(getSpecificInventoryFailure(error));
    }
  };
};

export default inventoryActions;
