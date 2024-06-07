import { inventoryActions } from "./actions";

const initialState = {
  inventories: [],
  specificInventory: null,
  loading: false,
  error: null,
};

export default function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case inventoryActions.CREATE_INVENTORY_REQUEST:
    case inventoryActions.UPDATE_INVENTORY_REQUEST:
    case inventoryActions.DELETE_INVENTORY_REQUEST:
    case inventoryActions.GET_INVENTORIES_LIST_REQUEST:
    case inventoryActions.GET_SPECIFIC_INVENTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case inventoryActions.CREATE_INVENTORY_SUCCESS:
    case inventoryActions.UPDATE_INVENTORY_SUCCESS:
    case inventoryActions.DELETE_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case inventoryActions.GET_INVENTORIES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        inventories: action.payload,
        error: null,
      };
    case inventoryActions.GET_SPECIFIC_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        specificInventory: action.payload,
        error: null,
      };
    case inventoryActions.CREATE_INVENTORY_FAILURE:
    case inventoryActions.UPDATE_INVENTORY_FAILURE:
    case inventoryActions.DELETE_INVENTORY_FAILURE:
    case inventoryActions.GET_INVENTORIES_LIST_FAILURE:
    case inventoryActions.GET_SPECIFIC_INVENTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
