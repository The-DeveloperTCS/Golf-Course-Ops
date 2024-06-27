import supplierActions from "./action";

const initialState = {
  suppliers: [],
  specificEmployee: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function supplierReducer(state = initialState, action) {
  switch (action.type) {
    case supplierActions.SUPPLIERS_FETCHED_PAGINATION:
      return {
        ...state,
        suppliers: [...action.suppliers],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };
    default:
      return state;
  }
}
