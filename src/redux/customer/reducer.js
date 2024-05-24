import customerActions from "./actions";

const initialState = {
  customers: [],
  specificCustomer: null,
  loading: false,
  error: null,
};

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case customerActions.CREATE_CUSTOMER_REQUEST:
    case customerActions.UPDATE_CUSTOMER_REQUEST:
    case customerActions.DELETE_CUSTOMER_REQUEST:
    case customerActions.GET_CUSTOMERS_LIST_REQUEST:
    case customerActions.GET_SPECIFIC_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case customerActions.CREATE_CUSTOMER_SUCCESS:
    case customerActions.UPDATE_CUSTOMER_SUCCESS:
    case customerActions.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case customerActions.GET_CUSTOMERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: action.payload,
        error: null,
      };
    case customerActions.GET_SPECIFIC_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        specificCustomer: action.payload,
        error: null,
      };
    case customerActions.CREATE_CUSTOMER_FAILURE:
    case customerActions.UPDATE_CUSTOMER_FAILURE:
    case customerActions.DELETE_CUSTOMER_FAILURE:
    case customerActions.GET_CUSTOMERS_LIST_FAILURE:
    case customerActions.GET_SPECIFIC_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
