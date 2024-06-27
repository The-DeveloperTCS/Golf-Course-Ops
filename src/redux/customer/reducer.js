import customerActions from "./action";

const initialState = {
  customers: [],
  specificCustomer: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case customerActions.CUSTOMER_FETCHED_PAGINATION:
      return {
        ...state,
        customers: [...action.customers],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    default:
      return state;
  }
}
