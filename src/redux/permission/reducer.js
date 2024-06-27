import permissionActions from "./action";

const initialState = {
  permissions: [],
  specificEmployee: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function permissionReducer(state = initialState, action) {
  switch (action.type) {
    case permissionActions.PERMISSIONS_FETCHED_PAGINATION:
      return {
        ...state,
        permissions: [...action.permissions],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    default:
      return state;
  }
}
