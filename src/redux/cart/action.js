import {
  addCartItem as addCartItemService,
  updateCartItem as updateCartItemService,
  deleteCartItem as deleteCartItemService,
  getCartItemsList as getCartItemsListService,
  getSpecificCartItem as getSpecificCartItemService,
} from "./service";

const cartActions = {
  ADD_CART_ITEM_REQUEST: "cart/add-cart-item-request",
  ADD_CART_ITEM_SUCCESS: "cart/add-cart-item-success",
  ADD_CART_ITEM_FAILURE: "cart/add-cart-item-failure",
  UPDATE_CART_ITEM_REQUEST: "cart/update-cart-item-request",
  UPDATE_CART_ITEM_SUCCESS: "cart/update-cart-item-success",
  UPDATE_CART_ITEM_FAILURE: "cart/update-cart-item-failure",
  DELETE_CART_ITEM_REQUEST: "cart/delete-cart-item-request",
  DELETE_CART_ITEM_SUCCESS: "cart/delete-cart-item-success",
  DELETE_CART_ITEM_FAILURE: "cart/delete-cart-item-failure",
  GET_CART_ITEMS_LIST_REQUEST: "cart/get-cart-items-list-request",
  GET_CART_ITEMS_LIST_SUCCESS: "cart/get-cart-items-list-success",
  GET_CART_ITEMS_LIST_FAILURE: "cart/get-cart-items-list-failure",
  GET_SPECIFIC_CART_ITEM_REQUEST: "cart/get-specific-cart-item-request",
  GET_SPECIFIC_CART_ITEM_SUCCESS: "cart/get-specific-cart-item-success",
  GET_SPECIFIC_CART_ITEM_FAILURE: "cart/get-specific-cart-item-failure",
};

export const addCartItemRequest = () => ({
  type: cartActions.ADD_CART_ITEM_REQUEST,
});

export const addCartItemSuccess = (data) => ({
  type: cartActions.ADD_CART_ITEM_SUCCESS,
  payload: data,
});

export const addCartItemFailure = (error) => ({
  type: cartActions.ADD_CART_ITEM_FAILURE,
  error: error,
});

export const addCartItem = (data) => {
  return async (dispatch) => {
    dispatch(addCartItemRequest());
    try {
      const response = await addCartItemService(data);
      dispatch(addCartItemSuccess(response));
    } catch (error) {
      dispatch(addCartItemFailure(error));
    }
  };
};

export const updateCartItemRequest = () => ({
  type: cartActions.UPDATE_CART_ITEM_REQUEST,
});

export const updateCartItemSuccess = (data) => ({
  type: cartActions.UPDATE_CART_ITEM_SUCCESS,
  payload: data,
});

export const updateCartItemFailure = (error) => ({
  type: cartActions.UPDATE_CART_ITEM_FAILURE,
  error: error,
});

export const updateCartItem = (id, data) => {
  return async (dispatch) => {
    dispatch(updateCartItemRequest());
    try {
      const response = await updateCartItemService(id, data);
      dispatch(updateCartItemSuccess(response));
    } catch (error) {
      dispatch(updateCartItemFailure(error));
    }
  };
};

export const deleteCartItemRequest = () => ({
  type: cartActions.DELETE_CART_ITEM_REQUEST,
});

export const deleteCartItemSuccess = (data) => ({
  type: cartActions.DELETE_CART_ITEM_SUCCESS,
  payload: data,
});

export const deleteCartItemFailure = (error) => ({
  type: cartActions.DELETE_CART_ITEM_FAILURE,
  error: error,
});

export const deleteCartItem = (id) => {
  return async (dispatch) => {
    dispatch(deleteCartItemRequest());
    try {
      const response = await deleteCartItemService(id);
      dispatch(deleteCartItemSuccess(response));
    } catch (error) {
      dispatch(deleteCartItemFailure(error));
    }
  };
};

export const getCartItemsListRequest = () => ({
  type: cartActions.GET_CART_ITEMS_LIST_REQUEST,
});

export const getCartItemsListSuccess = (data) => ({
  type: cartActions.GET_CART_ITEMS_LIST_SUCCESS,
  payload: data,
});

export const getCartItemsListFailure = (error) => ({
  type: cartActions.GET_CART_ITEMS_LIST_FAILURE,
  error: error,
});

export const getCartItemsList = (params) => {
  return async (dispatch) => {
    dispatch(getCartItemsListRequest());
    try {
      const response = await getCartItemsListService(params);
      dispatch(getCartItemsListSuccess(response));
    } catch (error) {
      dispatch(getCartItemsListFailure(error));
    }
  };
};

export const getSpecificCartItemRequest = () => ({
  type: cartActions.GET_SPECIFIC_CART_ITEM_REQUEST,
});

export const getSpecificCartItemSuccess = (data) => ({
  type: cartActions.GET_SPECIFIC_CART_ITEM_SUCCESS,
  payload: data,
});

export const getSpecificCartItemFailure = (error) => ({
  type: cartActions.GET_SPECIFIC_CART_ITEM_FAILURE,
  error: error,
});

export const getSpecificCartItem = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificCartItemRequest());
    try {
      const response = await getSpecificCartItemService(id);
      dispatch(getSpecificCartItemSuccess(response));
    } catch (error) {
      dispatch(getSpecificCartItemFailure(error));
    }
  };
};

export default cartActions;
