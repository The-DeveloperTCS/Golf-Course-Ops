import locationActions from "./action";

const initialState = {
  locations: [],
  specificLocation: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case locationActions.LOCATION_FETCHED_PAGINATION:
      return {
        ...state,
        locations: [...action.locations],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    default:
      return state;
  }
}
