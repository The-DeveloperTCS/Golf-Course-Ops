import loaderActions from "./actions";

const initState = {
  loading: {
    loader: false,
  },
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case loaderActions.START:
      return {
        ...state,
        loader: action.loader,
      };
    case loaderActions.END:
      return {
        ...state,
        loader: action.loader,
      };
    default:
      return state;
  }
}
