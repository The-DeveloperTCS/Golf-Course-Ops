import notificationActions from "redux/notifications/actions";
import { getGroupsList } from "./service";
import loaderAction from "../loader/actions";

const groupActions = {
  GROUPS_FETCHED_PAGINATION: "groups/fetched/pagination",
  FAILURE: "groups/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  groupsFetchedPagination: (data) => {
    return {
      type: groupActions.GROUPS_FETCHED_PAGINATION,
      groups: data.groups,
      total: data.pagination.totalGroups,
      pageLimit: data.pagination.limit,
      pageNo: data.pagination.currentPage,
    };
  },

  fetchGroupsPagination: (limit, pageNo) => {
    return (dispatch) => {
      getGroupsList(limit, pageNo)
        .then((res) => {
          dispatch(groupActions.groupsFetchedPagination(res));
          dispatch(groupActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: groupActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(groupActions.loaderOff());
        });
    };
  },
};

export default groupActions;
