import categoryActions from "./action";

const initialState = {
  categories: [],
  subCategories: [],
  specificCategory: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case categoryActions.CATEGORIES_FETCHED_PAGINATION:
      return {
        ...state,
        categories: [...action.categories],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    case categoryActions.SUBCATEGORIES_FETCHED_PAGINATION:
      return {
        ...state,
        subCategories: [...action.subCategories],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    default:
      return state;
  }
}
