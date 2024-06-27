import notificationActions from "redux/notifications/actions";
import { getDepartmentsList } from "./service";
import loaderAction from "../loader/actions";

const departmentActions = {
  DEPARTMENTS_FETCHED_PAGINATION: "departments/fetched/pagination",
  FAILURE: "departments/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  departmentsFetchedPagination: (data) => {
    return {
      type: departmentActions.DEPARTMENTS_FETCHED_PAGINATION,
      departments: data.departments,
      total: data.pagination.totaldepartments,
      pageLimit: data.pagination.limit,
      pageNo: data.pagination.currentPage,
    };
  },

  fetchDepartmentsPagination: (limit, pageNo) => {
    return (dispatch) => {
      getDepartmentsList(limit, pageNo)
        .then((res) => {
          dispatch(departmentActions.departmentsFetchedPagination(res));
          dispatch(departmentActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: departmentActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(departmentActions.loaderOff());
        });
    };
  },
};

export default departmentActions;
