import inventoryActions from "./action";

const initialState = {
  inventories: [],
  specificInventory: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case inventoryActions.INVENTORY_FETCHED_PAGINATION:
      return {
        ...state,
        inventories: [...action.inventories],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    default:
      return state;
  }
}
