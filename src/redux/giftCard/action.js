import notificationActions from "redux/notifications/actions";
import { getGiftCardsList } from "./service";
import loaderAction from "../loader/actions";

const giftCardActions = {
  GIFTCARDS_FETCHED_PAGINATION: "giftCards/fetched/pagination",
  FAILURE: "giftCards/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  GiftCardsFetchedPagination: (data) => {
    return {
      type: giftCardActions.GIFTCARDS_FETCHED_PAGINATION,
      giftCards: data.giftCards,
      total: data.pagination.totalgiftCards,
      pageLimit: data.pagination.limit,
      pageNo: data.pagination.currentPage,
    };
  },

  fetchGiftCardsPagination: (limit, pageNo) => {
    return (dispatch) => {
      getGiftCardsList(limit, pageNo)
        .then((res) => {
          dispatch(giftCardActions.GiftCardsFetchedPagination(res));
          dispatch(giftCardActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: giftCardActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(giftCardActions.loaderOff());
        });
    };
  },
};

export default giftCardActions;
