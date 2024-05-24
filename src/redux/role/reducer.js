import { roleActions } from "./action";

const initialState = {
  roles: [],
  specificRole: null,
  loading: false,
  error: null,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case roleActions.CREATE_ROLE_REQUEST:
    case roleActions.UPDATE_ROLE_REQUEST:
    case roleActions.DELETE_ROLE_REQUEST:
    case roleActions.GET_ROLES_LIST_REQUEST:
    case roleActions.GET_SPECIFIC_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case roleActions.CREATE_ROLE_SUCCESS:
      return {
        ...state,
        roles: [...state.roles, action.payload],
        loading: false,
      };
    case roleActions.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        roles: state.roles.map((role) =>
          role.id === action.payload.id ? action.payload : role
        ),
        loading: false,
      };
    case roleActions.DELETE_ROLE_SUCCESS:
      return {
        ...state,
        roles: state.roles.filter((role) => role.id !== action.payload.id),
        loading: false,
      };
    case roleActions.GET_ROLES_LIST_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        loading: false,
      };
    case roleActions.GET_SPECIFIC_ROLE_SUCCESS:
      return {
        ...state,
        specificRole: action.payload,
        loading: false,
      };
    case roleActions.CREATE_ROLE_FAILURE:
    case roleActions.UPDATE_ROLE_FAILURE:
    case roleActions.DELETE_ROLE_FAILURE:
    case roleActions.GET_ROLES_LIST_FAILURE:
    case roleActions.GET_SPECIFIC_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default roleReducer;
