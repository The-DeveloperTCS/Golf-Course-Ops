import notificationActions from "redux/notifications/actions";
import { getCartsList } from "./service";
import loaderAction from "../loader/actions";

const cartActions = {
  CARTS_FETCHED_PAGINATION: "carts/fetched/pagination",
  FAILURE: "carts/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  cartsFetchedPagination: (data) => {
    return {
      type: cartActions.CARTS_FETCHED_PAGINATION,
      carts: data.carts,
      total: 1,
      pageLimit: 1,
      pageNo: 1,
    };
  },

  fetchEmployeesPagination: (limit, pageNo) => {
    return (dispatch) => {
      getCartsList(limit, pageNo)
        .then((res) => {
          dispatch(cartActions.cartsFetchedPagination(res));
          dispatch(cartActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: cartActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(cartActions.loaderOff());
        });
    };
  },
};

export default cartActions;
