import { login, permissions } from "./service";
import { history } from "../store";

const authActions = {
  LOGIN_REQUEST: "auth/login-request",
  LOGIN_SUCCESS: "auth/login-success",
  LOGIN_FAILURE: "auth/login-failure",
  LOGOUT: "auth/logout",
  TOKEN_REFRESH: "auth/token-refresh",
  PERMISSIONS_UPDATED: "auth/permissions-updated",

  tokenRefresh: (accessToken) => {
    return {
      type: authActions.TOKEN_REFRESH,
      accessToken: accessToken,
    };
  },

  loginRequest: (data) => {
    return (dispatch) => {
      login(data.phoneNumber, data.otpCode)
        .then((res) => {
          dispatch(authActions.login(res.data));
          history.push("/intro");
        })
        .catch((err) => {
          dispatch({ type: authActions.LOGIN_FAILURE, message: err.message });
        });
    };
  },

  login: (data) => {
    return {
      type: authActions.LOGIN_SUCCESS,
      isLogin: true,
      accessToken: data.token,
      refreshToken: data.refreshToken,
    };
  },

  logout: () => {
    return {
      type: authActions.LOGOUT,
      isLogin: false,
      accessToken: null,
      refreshToken: null,
    };
  },

  permissionsUpdated: (data) => {
    return {
      type: authActions.PERMISSIONS_UPDATED,
      permissions: data,
    };
  },

  fetchPermissions: () => {
    return (dispatch) => {
      permissions().then((res) => {
        dispatch(authActions.permissionsUpdated(res.data));
      });
    };
  },
};

export default authActions;
