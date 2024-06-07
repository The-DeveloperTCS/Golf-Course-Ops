import { categoryActions } from "./action";

const initState = {
  categories: [],
  specificCategory: null,
  loading: false,
  error: null,
};

export default function categoryReducer(state = initState, action) {
  switch (action.type) {
    case categoryActions.CREATE_CATEGORY_REQUEST:
    case categoryActions.UPDATE_CATEGORY_REQUEST:
    case categoryActions.DELETE_CATEGORY_REQUEST:
    case categoryActions.GET_CATEGORIES_LIST_REQUEST:
    case categoryActions.GET_SPECIFIC_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case categoryActions.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
      };
    case categoryActions.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
        loading: false,
      };
    case categoryActions.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload.id
        ),
        loading: false,
      };
    case categoryActions.GET_CATEGORIES_LIST_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case categoryActions.GET_SPECIFIC_CATEGORY_SUCCESS:
      return {
        ...state,
        specificCategory: action.payload,
        loading: false,
      };
    case categoryActions.CREATE_CATEGORY_FAILURE:
    case categoryActions.UPDATE_CATEGORY_FAILURE:
    case categoryActions.DELETE_CATEGORY_FAILURE:
    case categoryActions.GET_CATEGORIES_LIST_FAILURE:
    case categoryActions.GET_SPECIFIC_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
