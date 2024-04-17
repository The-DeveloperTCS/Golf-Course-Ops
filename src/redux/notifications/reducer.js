import notificationActions from "./actions";

const initState = {
  notification: {
    success: "",
    failure: "",
    warning: "",
    error: null,
  },
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case notificationActions.SUCCESS:
      return {
        ...state,
        success: action.message,
      };
    case notificationActions.WARNING:
      return {
        ...state,
        warning: action.message,
      };
    case notificationActions.FAILURE:
      return {
        ...state,
        failure: action.message,
      };
    case notificationActions.CLEAR:
      return {
        ...state,
        failure: action.message,
        success: action.message,
        warning: action.message,
      };
    case notificationActions.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case notificationActions.ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
