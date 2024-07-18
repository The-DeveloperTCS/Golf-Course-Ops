import { login, permissions } from "./service";
import { history } from "../store";
import notificationActions from "redux/notifications/actions";

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

  loginRequest: (username, password) => {
    return (dispatch) => {
      login(username, password)
        .then((res) => {
          console.log(res, "response");
          dispatch(authActions.login(res));
          history.push("/Intro");
        })
        .catch((err) => {
          console.log(err, "errrrr");
          dispatch({
            type: authActions.LOGIN_FAILURE,
            message: err.response.data.message,
          });
          dispatch(
            notificationActions.failure(
              "Failed to login, " + err.response.data.message
            )
          );
        });
    };
  },

  login: (data) => {
    return {
      type: authActions.LOGIN_SUCCESS,
      isLogin: true,
      accessToken: data.token,
      refreshToken: data.token,
      user: data.user,
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
