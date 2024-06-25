import roleActions from "./action";

const initialState = {
  roles: [],
  specificRole: null,
  loading: false,
  error: null,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case roleActions.ROLES_FETCHED_PAGINATION:
      return {
        ...state,
        roles: [...action.roles],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };
    default:
      return state;
  }
};

export default roleReducer;
