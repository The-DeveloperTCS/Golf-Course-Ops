import notificationActions from "redux/notifications/actions";
import { getSeasonsList } from "./service";
import loaderAction from "../loader/actions";

const seasonActions = {
  SEASONS_FETCHED_PAGINATION: "seasons/fetched/pagination",
  FAILURE: "seasons/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  seasonsFetchedPagination: (data) => {
    return {
      type: seasonActions.SEASONS_FETCHED_PAGINATION,
      seasons: data.seasons,
      total: data.pagination.totalSeasons,
      pageLimit: data.pagination.limit,
      pageNo: data.pagination.currentPage,
    };
  },

  fetchSeasonsPagination: (limit, pageNo) => {
    return (dispatch) => {
      getSeasonsList(limit, pageNo)
        .then((res) => {
          dispatch(seasonActions.seasonsFetchedPagination(res.data));
          dispatch(seasonActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: seasonActions.FAILURE,
            message: err.response?.data.message,
          });
          dispatch(notificationActions.failure(err.response?.data.message));
          dispatch(seasonActions.loaderOff());
        });
    };
  },
};

export default seasonActions;
