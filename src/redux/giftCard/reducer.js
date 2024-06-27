import giftCardActions from "./action";

const initialState = {
  giftCards: [],
  specificGiftCard: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function giftCardReducer(state = initialState, action) {
  switch (action.type) {
    case giftCardActions.GIFTCARDS_FETCHED_PAGINATION:
      return {
        ...state,
        giftCards: [...action.giftCards],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    default:
      return state;
  }
}
