import notificationActions from "redux/notifications/actions";
import { getLocationsList } from "./service";
import loaderAction from "../loader/actions";

const locationActions = {
  LOCATION_FETCHED_PAGINATION: "locations/fetched/pagination",
  FAILURE: "locations/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  locationsFetchedPagination: (data) => {
    return {
      type: locationActions.LOCATION_FETCHED_PAGINATION,
      locations: data.locations,
      total: 1,
      pageLimit: 1,
      pageNo: 1,
    };
  },

  fetchLocationsPagination: (limit, pageNo) => {
    return (dispatch) => {
      getLocationsList(limit, pageNo)
        .then((res) => {
          dispatch(locationActions.locationsFetchedPagination(res));
          dispatch(locationActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: locationActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(locationActions.loaderOff());
        });
    };
  },
};

export default locationActions;
