import notificationActions from "redux/notifications/actions";
import { getEmployeesList } from "./service";
import loaderAction from "../loader/actions";

const employeeActions = {
  EMPLOYEES_FETCHED_PAGINATION: "employees/fetched/pagination",
  FAILURE: "employees/failure",

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
      total: data.pagination.totalEmployees,
      pageLimit: data.pagination.limit,
      pageNo: data.pagination.currentPage,
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
