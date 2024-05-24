import { terminalActions } from "./actions";

const initialState = {
  terminals: [],
  specificTerminal: null,
  loading: false,
  error: null,
};

export default function terminalReducer(state = initialState, action) {
  switch (action.type) {
    case terminalActions.CREATE_TERMINAL_REQUEST:
    case terminalActions.UPDATE_TERMINAL_REQUEST:
    case terminalActions.DELETE_TERMINAL_REQUEST:
    case terminalActions.GET_TERMINALS_LIST_REQUEST:
    case terminalActions.GET_SPECIFIC_TERMINAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case terminalActions.CREATE_TERMINAL_SUCCESS:
    case terminalActions.UPDATE_TERMINAL_SUCCESS:
    case terminalActions.DELETE_TERMINAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case terminalActions.GET_TERMINALS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        terminals: action.payload,
        error: null,
      };
    case terminalActions.GET_SPECIFIC_TERMINAL_SUCCESS:
      return {
        ...state,
        loading: false,
        specificTerminal: action.payload,
        error: null,
      };
    case terminalActions.CREATE_TERMINAL_FAILURE:
    case terminalActions.UPDATE_TERMINAL_FAILURE:
    case terminalActions.DELETE_TERMINAL_FAILURE:
    case terminalActions.GET_TERMINALS_LIST_FAILURE:
    case terminalActions.GET_SPECIFIC_TERMINAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
