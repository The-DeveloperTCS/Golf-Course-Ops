import notificationActions from "redux/notifications/actions";
import { getSuppliersList } from "./service";
import loaderAction from "../loader/actions";

const supplierActions = {
  SUPPLIERS_FETCHED_PAGINATION: "suppliers/fetched/pagination",
  FAILURE: "suppliers/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  suppliersFetchedPagination: (data) => {
    return {
      type: supplierActions.SUPPLIERS_FETCHED_PAGINATION,
      suppliers: data.suppliers,
      total: data.pagination.totalSuppliers,
      pageLimit: data.pagination.limit,
      pageNo: data.pagination.currentPage,
    };
  },

  fetchSuppliersPagination: (limit, pageNo) => {
    return (dispatch) => {
      getSuppliersList(limit, pageNo)
        .then((res) => {
          dispatch(supplierActions.suppliersFetchedPagination(res));
          dispatch(supplierActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: supplierActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(supplierActions.loaderOff());
        });
    };
  },
};

export default supplierActions;
