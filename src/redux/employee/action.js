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
      employees: data.employees,
      total: 1,
      pageLimit: 1,
      pageNo: 1,
    };
  },

  fetchEmployeesPagination: (limit, pageNo) => {
    return (dispatch) => {
      getEmployeesList(limit, pageNo)
        .then((res) => {
          dispatch(employeeActions.employeesFetchedPagination(res));
          dispatch(employeeActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: employeeActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(employeeActions.loaderOff());
        });
    };
  },
};

export default employeeActions;
