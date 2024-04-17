const loaderActions = {
  START: "loader/start",
  END: "loader/end",

  startLoader: (value) => {
    return (dispatch) => {
      dispatch(loaderActions.setStartLoader(value));
    };
  },

  endLoader: (value) => {
    return (dispatch) => {
      dispatch(loaderActions.setEndLoader(value));
    };
  },

  setStartLoader: (value) => {
    return {
      type: loaderActions.START,
      loader: value,
    };
  },

  setEndLoader: (value) => {
    return {
      type: loaderActions.END,
      loader: value,
    };
  },
};

export default loaderActions;
