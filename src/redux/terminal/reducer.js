import terminalActions from "./action";

const initialState = {
  terminals: [],
  specificTerminal: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function permissionReducer(state = initialState, action) {
  switch (action.type) {
    case terminalActions.TERMINALS_FETCHED_PAGINATION:
      return {
        ...state,
        terminals: [...action.terminals],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    default:
      return state;
  }
}
