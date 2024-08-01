import seasonActions from "./action";

const initialState = {
  seasons: [],
  specificSeason: null,
  seasonList: [],
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function permissionReducer(state = initialState, action) {
  switch (action.type) {
    case seasonActions.SEASONS_FETCHED_PAGINATION:
      return {
        ...state,
        seasons: [...action.seasons],
        // seasonList: [...action.seasonList],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    default:
      return state;
  }
}
