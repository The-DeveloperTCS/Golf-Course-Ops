import notificationActions from "redux/notifications/actions";
import { getPermissionsList } from "./service";
import loaderAction from "../loader/actions";

const permissionActions = {
  PERMISSIONS_FETCHED_PAGINATION: "permissions/fetched/pagination",
  FAILURE: "permissions/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  permissionsFetchedPagination: (data) => {
    return {
      type: permissionActions.PERMISSIONS_FETCHED_PAGINATION,
      permissions: data.permissions,
      total: 1,
      pageLimit: 1,
      pageNo: 1,
    };
  },

  fetchPermissionsPagination: (limit, pageNo) => {
    return (dispatch) => {
      getPermissionsList(limit, pageNo)
        .then((res) => {
          dispatch(permissionActions.permissionsFetchedPagination(res));
          dispatch(permissionActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: permissionActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(permissionActions.loaderOff());
        });
    };
  },
};

export default permissionActions;
