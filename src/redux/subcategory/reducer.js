import { subcategoryActions } from "./action";

const initialState = {
  subcategories: [],
  specificSubcategory: null,
  loading: false,
  error: null,
};

const subcategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case subcategoryActions.CREATE_SUBCATEGORY_REQUEST:
    case subcategoryActions.UPDATE_SUBCATEGORY_REQUEST:
    case subcategoryActions.DELETE_SUBCATEGORY_REQUEST:
    case subcategoryActions.GET_SUBCATEGORIES_LIST_REQUEST:
    case subcategoryActions.GET_SPECIFIC_SUBCATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case subcategoryActions.CREATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        subcategories: [...state.subcategories, action.payload],
        loading: false,
      };
    case subcategoryActions.UPDATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        subcategories: state.subcategories.map((subcategory) =>
          subcategory.id === action.payload.id ? action.payload : subcategory
        ),
        loading: false,
      };
    case subcategoryActions.DELETE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        subcategories: state.subcategories.filter(
          (subcategory) => subcategory.id !== action.payload.id
        ),
        loading: false,
      };
    case subcategoryActions.GET_SUBCATEGORIES_LIST_SUCCESS:
      return {
        ...state,
        subcategories: action.payload,
        loading: false,
      };
    case subcategoryActions.GET_SPECIFIC_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        specificSubcategory: action.payload,
        loading: false,
      };
    case subcategoryActions.CREATE_SUBCATEGORY_FAILURE:
    case subcategoryActions.UPDATE_SUBCATEGORY_FAILURE:
    case subcategoryActions.DELETE_SUBCATEGORY_FAILURE:
    case subcategoryActions.GET_SUBCATEGORIES_LIST_FAILURE:
    case subcategoryActions.GET_SPECIFIC_SUBCATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default subcategoryReducer;
