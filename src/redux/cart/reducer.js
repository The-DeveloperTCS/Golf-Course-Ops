import cartActions from "./action";

const initialState = {
  carts: [],
  specificCart: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case cartActions.CARTS_FETCHED_PAGINATION:
      return {
        ...state,
        carts: [...action.carts],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    default:
      return state;
  }
}
