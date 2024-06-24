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
      total: 1,
      pageLimit: 1,
      pageNo: 1,
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
