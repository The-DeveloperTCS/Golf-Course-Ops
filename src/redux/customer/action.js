import notificationActions from "redux/notifications/actions";
import { getCustomersList } from "./service";
import loaderAction from "../loader/actions";

const locationActions = {
  CUSTOMER_FETCHED_PAGINATION: "customers/fetched/pagination",
  FAILURE: "customers/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  customersFetchedPagination: (data) => {
    return {
      type: locationActions.CUSTOMER_FETCHED_PAGINATION,
      customers: data.customers,
      total: data.pagination.totalCustomers,
      pageLimit: data.pagination.limit,
      pageNo: data.pagination.currentPage,
    };
  },

  fetchCustomersPagination: (limit, pageNo) => {
    return (dispatch) => {
      getCustomersList(limit, pageNo)
        .then((res) => {
          dispatch(locationActions.customersFetchedPagination(res));
          dispatch(locationActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: locationActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(locationActions.loaderOff());
        });
    };
  },
};

export default locationActions;
