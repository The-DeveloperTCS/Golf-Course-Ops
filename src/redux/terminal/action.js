import {
  createTerminal as createTerminalService,
  updateTerminal as updateTerminalService,
  deleteTerminal as deleteTerminalService,
  getTerminalsList as getTerminalsListService,
  getSpecificTerminal as getSpecificTerminalService,
} from "./service";

const terminalActions = {
  CREATE_TERMINAL_REQUEST: "terminal/create-terminal-request",
  CREATE_TERMINAL_SUCCESS: "terminal/create-terminal-success",
  CREATE_TERMINAL_FAILURE: "terminal/create-terminal-failure",
  UPDATE_TERMINAL_REQUEST: "terminal/update-terminal-request",
  UPDATE_TERMINAL_SUCCESS: "terminal/update-terminal-success",
  UPDATE_TERMINAL_FAILURE: "terminal/update-terminal-failure",
  DELETE_TERMINAL_REQUEST: "terminal/delete-terminal-request",
  DELETE_TERMINAL_SUCCESS: "terminal/delete-terminal-success",
  DELETE_TERMINAL_FAILURE: "terminal/delete-terminal-failure",
  GET_TERMINALS_LIST_REQUEST: "terminal/get-terminals-list-request",
  GET_TERMINALS_LIST_SUCCESS: "terminal/get-terminals-list-success",
  GET_TERMINALS_LIST_FAILURE: "terminal/get-terminals-list-failure",
  GET_SPECIFIC_TERMINAL_REQUEST: "terminal/get-specific-terminal-request",
  GET_SPECIFIC_TERMINAL_SUCCESS: "terminal/get-specific-terminal-success",
  GET_SPECIFIC_TERMINAL_FAILURE: "terminal/get-specific-terminal-failure",
};

export const createTerminalRequest = () => ({
  type: terminalActions.CREATE_TERMINAL_REQUEST,
});

export const createTerminalSuccess = (data) => ({
  type: terminalActions.CREATE_TERMINAL_SUCCESS,
  payload: data,
});

export const createTerminalFailure = (error) => ({
  type: terminalActions.CREATE_TERMINAL_FAILURE,
  error: error,
});

export const createTerminal = (data) => {
  return async (dispatch) => {
    dispatch(createTerminalRequest());
    try {
      const response = await createTerminalService(data);
      dispatch(createTerminalSuccess(response));
    } catch (error) {
      dispatch(createTerminalFailure(error));
    }
  };
};

export const updateTerminalRequest = () => ({
  type: terminalActions.UPDATE_TERMINAL_REQUEST,
});

export const updateTerminalSuccess = (data) => ({
  type: terminalActions.UPDATE_TERMINAL_SUCCESS,
  payload: data,
});

export const updateTerminalFailure = (error) => ({
  type: terminalActions.UPDATE_TERMINAL_FAILURE,
  error: error,
});

export const updateTerminal = (id, data) => {
  return async (dispatch) => {
    dispatch(updateTerminalRequest());
    try {
      const response = await updateTerminalService(id, data);
      dispatch(updateTerminalSuccess(response));
    } catch (error) {
      dispatch(updateTerminalFailure(error));
    }
  };
};

export const deleteTerminalRequest = () => ({
  type: terminalActions.DELETE_TERMINAL_REQUEST,
});

export const deleteTerminalSuccess = (data) => ({
  type: terminalActions.DELETE_TERMINAL_SUCCESS,
  payload: data,
});

export const deleteTerminalFailure = (error) => ({
  type: terminalActions.DELETE_TERMINAL_FAILURE,
  error: error,
});

export const deleteTerminal = (id) => {
  return async (dispatch) => {
    dispatch(deleteTerminalRequest());
    try {
      const response = await deleteTerminalService(id);
      dispatch(deleteTerminalSuccess(response));
    } catch (error) {
      dispatch(deleteTerminalFailure(error));
    }
  };
};

export const getTerminalsListRequest = () => ({
  type: terminalActions.GET_TERMINALS_LIST_REQUEST,
});

export const getTerminalsListSuccess = (data) => ({
  type: terminalActions.GET_TERMINALS_LIST_SUCCESS,
  payload: data,
});

export const getTerminalsListFailure = (error) => ({
  type: terminalActions.GET_TERMINALS_LIST_FAILURE,
  error: error,
});

export const getTerminalsList = (params) => {
  return async (dispatch) => {
    dispatch(getTerminalsListRequest());
    try {
      const response = await getTerminalsListService(params);
      dispatch(getTerminalsListSuccess(response));
    } catch (error) {
      dispatch(getTerminalsListFailure(error));
    }
  };
};

export const getSpecificTerminalRequest = () => ({
  type: terminalActions.GET_SPECIFIC_TERMINAL_REQUEST,
});

export const getSpecificTerminalSuccess = (data) => ({
  type: terminalActions.GET_SPECIFIC_TERMINAL_SUCCESS,
  payload: data,
});

export const getSpecificTerminalFailure = (error) => ({
  type: terminalActions.GET_SPECIFIC_TERMINAL_FAILURE,
  error: error,
});

export const getSpecificTerminal = (id) => {
  return async (dispatch) => {
    dispatch(getSpecificTerminalRequest());
    try {
      const response = await getSpecificTerminalService(id);
      dispatch(getSpecificTerminalSuccess(response));
    } catch (error) {
      dispatch(getSpecificTerminalFailure(error));
    }
  };
};

export default terminalActions;
