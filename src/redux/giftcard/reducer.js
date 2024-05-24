import giftcardActions from "./actions";

const initialState = {
  giftcards: [],
  specificGiftcard: null,
  loading: false,
  error: null,
};

export default function giftcardReducer(state = initialState, action) {
  switch (action.type) {
    case giftcardActions.CREATE_GIFTCARD_REQUEST:
    case giftcardActions.UPDATE_GIFTCARD_REQUEST:
    case giftcardActions.DELETE_GIFTCARD_REQUEST:
    case giftcardActions.GET_GIFTCARDS_LIST_REQUEST:
    case giftcardActions.GET_SPECIFIC_GIFTCARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case giftcardActions.CREATE_GIFTCARD_SUCCESS:
    case giftcardActions.UPDATE_GIFTCARD_SUCCESS:
    case giftcardActions.DELETE_GIFTCARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case giftcardActions.GET_GIFTCARDS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        giftcards: action.payload,
        error: null,
      };
    case giftcardActions.GET_SPECIFIC_GIFTCARD_SUCCESS:
      return {
        ...state,
        loading: false,
        specificGiftcard: action.payload,
        error: null,
      };
    case giftcardActions.CREATE_GIFTCARD_FAILURE:
    case giftcardActions.UPDATE_GIFTCARD_FAILURE:
    case giftcardActions.DELETE_GIFTCARD_FAILURE:
    case giftcardActions.GET_GIFTCARDS_LIST_FAILURE:
    case giftcardActions.GET_SPECIFIC_GIFTCARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
