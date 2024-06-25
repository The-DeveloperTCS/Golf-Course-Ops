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
    return {
      type: roleActions.ROLES_FETCHED_PAGINATION,
      roles: data.roles,
      total: 1,
      pageLimit: 1,
      pageNo: 1,
    };
  },

  fetchRolesPagination: (limit, pageNo) => {
    return (dispatch) => {
      getRolesList(limit, pageNo)
        .then((res) => {
          dispatch(roleActions.rolesFetchedPagination(res));
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
