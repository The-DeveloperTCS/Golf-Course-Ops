import groupActions from "./action";

const initialState = {
  groups: [],
  specificGroup: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case groupActions.GROUPS_FETCHED_PAGINATION:
      return {
        ...state,
        groups: [...action.groups],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    default:
      return state;
  }
}
