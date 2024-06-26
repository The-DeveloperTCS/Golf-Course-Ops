import notificationActions from "redux/notifications/actions";
import { getCategoriesList } from "./service";
import loaderAction from "../loader/actions";

const categoryActions = {
  CATEGORIES_FETCHED_PAGINATION: "categories/fetched/pagination",
  FAILURE: "categories/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  categoriesFetchedPagination: (data) => {
    return {
      type: categoryActions.CATEGORIES_FETCHED_PAGINATION,
      categories: data.categories,
      total: data.pagination.totalCategories,
      pageLimit: data.pagination.limit,
      pageNo: data.pagination.currentPage,
    };
  },

  fetchCategoriesPagination: (limit, pageNo) => {
    return (dispatch) => {
      getCategoriesList(limit, pageNo)
        .then((res) => {
          dispatch(categoryActions.categoriesFetchedPagination(res));
          dispatch(categoryActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: categoryActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(categoryActions.loaderOff());
        });
    };
  },
};

export default categoryActions;
