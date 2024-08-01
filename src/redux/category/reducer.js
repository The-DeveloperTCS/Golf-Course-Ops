import categoryActions from "./action";

const initialState = {
  categories: [],
  specificCategory: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
  subCategories: [],
  specificSubCategory: null,
  totalSubCategories: null,
  pageLimitSubCategories: null,
  pageNoSubCategories: null,
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
    case categoryActions.SUB_CATEGORIES_FETCHED_PAGINATION:
      return {
        ...state,
        subCategories: [...action.subCategories],
        totalSubCategories: action.totalSubCategories,
        pageLimitSubCategories: action.pageLimitSubCategories,
        pageNoSubCategories: action.pageNoSubCategories,
      };
    default:
      return state;
  }
}
