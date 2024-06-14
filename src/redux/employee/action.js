import notificationActions from "redux/notifications/actions";
import { getEmployeesList } from "./service";
import loaderAction from "../loader/actions";

const employeeActions = {
  EMPLOYEES_FETCHED_PAGINATION: "employees/fetched/pagination",
  FAILURE: "employees/failure",

  // ORDER_UPDATE: "orders/updated",
  // ORDERS_FETCHED: "orders/fetched",
  // ORDER_SALE_INVOICE: "orders/sale-invoice",
  // ORDER_CREDIT_NOTES: "orders/credit-notes",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  employeesFetchedPagination: (data) => {
    return {
      type: employeeActions.EMPLOYEES_FETCHED_PAGINATION,
      employees: [],
      total: data.count,
      pageLimit: data.limit,
      pageNo: data.page,
    };
  },

  fetchEmployeesPagination: (limit, pageNo) => {
    return (dispatch) => {
      getEmployeesList(limit, pageNo)
        .then((res) => {
          dispatch(employeeActions.employeesFetchedPagination(res.data));
          // dispatch(employeeActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: employeeActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          // dispatch(employeeActions.loaderOff());
        });
    };
  },
};

export default employeeActions;
