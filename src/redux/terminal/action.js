import notificationActions from "redux/notifications/actions";
import { getTerminalsList } from "./service";
import loaderAction from "../loader/actions";

const terminalActions = {
  TERMINALS_FETCHED_PAGINATION: "terminals/fetched/pagination",
  FAILURE: "terminals/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  terminalsFetchedPagination: (data) => {
    return {
      type: terminalActions.TERMINALS_FETCHED_PAGINATION,
      terminals: data.terminals,
      total: data.pagination.totalTerminals,
      pageLimit: data.pagination.limit,
      pageNo: data.pagination.currentPage,
    };
  },

  fetchTerminalsPagination: (limit, pageNo) => {
    return (dispatch) => {
      getTerminalsList(limit, pageNo)
        .then((res) => {
          dispatch(terminalActions.terminalsFetchedPagination(res.data));
          dispatch(terminalActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: terminalActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(terminalActions.loaderOff());
        });
    };
  },
};

export default terminalActions;
