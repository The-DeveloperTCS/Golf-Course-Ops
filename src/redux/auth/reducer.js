import authAction from "./actions";

const initState = {
  isLogin: localStorage.getItem("isLogin")
    ? localStorage.getItem("isLogin") === "true"
    : false,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  permissions: [],
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case authAction.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: action.isLogin,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case authAction.LOGOUT:
      return {
        ...state,
        isLogin: action.isLogin,
        accessToken: null,
        refreshToken: null,
      };
    case authAction.TOKEN_REFRESH:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case authAction.PERMISSIONS_UPDATED:
      return {
        ...state,
        permissions: action.permissions,
      };
    default:
      return state;
  }
}
