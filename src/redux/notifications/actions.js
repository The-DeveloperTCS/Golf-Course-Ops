const notificationActions = {
  SUCCESS: "notification/success",
  WARNING: "notification/warning",
  FAILURE: "notification/failure",
  CLEAR: "notification/clear",
  CLEAR_ERROR: "notification/clear_error",
  ERROR: "notification/error",

  success: (message) => {
    return {
      type: notificationActions.SUCCESS,
      message: message,
    };
  },

  warning: (message) => {
    return {
      type: notificationActions.WARNING,
      message: message,
    };
  },

  warningWithTimeout: (message) => {
    return (dispatch) => {
      dispatch(notificationActions.warning(message));
      setTimeout(() => {
        dispatch(notificationActions.clearNotifications());
      }, 5000);
    };
  },

  successWithTimeout: (message) => {
    return (dispatch) => {
      dispatch(notificationActions.success(message));
      setTimeout(() => {
        dispatch(notificationActions.clearNotifications());
      }, 5000);
    };
  },

  failure: (message) => {
    return {
      type: notificationActions.FAILURE,
      message: message,
    };
  },

  failureWithTimeout: (message) => {
    return (dispatch) => {
      dispatch(notificationActions.failure(message));
      setTimeout(() => {
        dispatch(notificationActions.clearNotifications());
      }, 5000);
    };
  },

  clearNotifications: () => {
    return {
      type: notificationActions.CLEAR,
      message: "",
    };
  },

  clearError: () => {
    return {
      type: notificationActions.CLEAR_ERROR,
    };
  },

  error: (err) => {
    return {
      type: notificationActions.ERROR,
      error: err,
    };
  },
};

export default notificationActions;
