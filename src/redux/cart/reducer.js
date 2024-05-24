import cartActions from "./actions";

const initialState = {
  cartItems: [],
  specificCartItem: null,
  loading: false,
  error: null,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case cartActions.ADD_CART_ITEM_REQUEST:
    case cartActions.UPDATE_CART_ITEM_REQUEST:
    case cartActions.DELETE_CART_ITEM_REQUEST:
    case cartActions.GET_CART_ITEMS_LIST_REQUEST:
    case cartActions.GET_SPECIFIC_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case cartActions.ADD_CART_ITEM_SUCCESS:
    case cartActions.UPDATE_CART_ITEM_SUCCESS:
    case cartActions.DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case cartActions.GET_CART_ITEMS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
        error: null,
      };
    case cartActions.GET_SPECIFIC_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        specificCartItem: action.payload,
        error: null,
      };
    case cartActions.ADD_CART_ITEM_FAILURE:
    case cartActions.UPDATE_CART_ITEM_FAILURE:
    case cartActions.DELETE_CART_ITEM_FAILURE:
    case cartActions.GET_CART_ITEMS_LIST_FAILURE:
    case cartActions.GET_SPECIFIC_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
