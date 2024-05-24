import { supplierActions } from "./action";

const initialState = {
  suppliers: [],
  specificSupplier: null,
  loading: false,
  error: null,
};

const supplierReducer = (state = initialState, action) => {
  switch (action.type) {
    case supplierActions.CREATE_SUPPLIER_REQUEST:
    case supplierActions.UPDATE_SUPPLIER_REQUEST:
    case supplierActions.DELETE_SUPPLIER_REQUEST:
    case supplierActions.GET_SUPPLIERS_LIST_REQUEST:
    case supplierActions.GET_SPECIFIC_SUPPLIER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case supplierActions.CREATE_SUPPLIER_SUCCESS:
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
        loading: false,
      };
    case supplierActions.UPDATE_SUPPLIER_SUCCESS:
      return {
        ...state,
        suppliers: state.suppliers.map((supplier) =>
          supplier.id === action.payload.id ? action.payload : supplier
        ),
        loading: false,
      };
    case supplierActions.DELETE_SUPPLIER_SUCCESS:
      return {
        ...state,
        suppliers: state.suppliers.filter(
          (supplier) => supplier.id !== action.payload.id
        ),
        loading: false,
      };
    case supplierActions.GET_SUPPLIERS_LIST_SUCCESS:
      return {
        ...state,
        suppliers: action.payload,
        loading: false,
      };
    case supplierActions.GET_SPECIFIC_SUPPLIER_SUCCESS:
      return {
        ...state,
        specificSupplier: action.payload,
        loading: false,
      };
    case supplierActions.CREATE_SUPPLIER_FAILURE:
    case supplierActions.UPDATE_SUPPLIER_FAILURE:
    case supplierActions.DELETE_SUPPLIER_FAILURE:
    case supplierActions.GET_SUPPLIERS_LIST_FAILURE:
    case supplierActions.GET_SPECIFIC_SUPPLIER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default supplierReducer;
