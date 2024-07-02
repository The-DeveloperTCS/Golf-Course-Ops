import notificationActions from "redux/notifications/actions";
import loaderAction from "../loader/actions";
import { getRolesList } from "./service";

const roleActions = {
  ROLES_FETCHED_PAGINATION: "roles/fetched/pagination",
  FAILURE: "roles/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  rolesFetchedPagination: (data) => {
    console.log(data, "data");
    return {
      type: roleActions.ROLES_FETCHED_PAGINATION,
      roles: data.roles,
      total: data.pagination.totalRoles,
      pageLimit: data.pagination.limit,
      pageNo: data.pagination.currentPage,
    };
  },

  fetchRolesPagination: (limit, pageNo) => {
    return (dispatch) => {
      getRolesList(limit, pageNo)
        .then((res) => {
          dispatch(roleActions.rolesFetchedPagination(res.data));
          dispatch(roleActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: roleActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(roleActions.loaderOff());
        });
    };
  },
};

export default roleActions;
