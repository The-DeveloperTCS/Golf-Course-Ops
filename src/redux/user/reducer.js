import { userActions } from "./action";

const initState = {
  users: [],
  specificUser: null,
  loading: false,
  error: null,
};

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case userActions.CREATE_USER_REQUEST:
    case userActions.UPDATE_USER_REQUEST:
    case userActions.DELETE_USER_REQUEST:
    case userActions.GET_USERS_LIST_REQUEST:
    case userActions.GET_SPECIFIC_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case userActions.CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false,
      };
    case userActions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        loading: false,
      };
    case userActions.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
        loading: false,
      };
    case userActions.GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case userActions.GET_SPECIFIC_USER_SUCCESS:
      return {
        ...state,
        specificUser: action.payload,
        loading: false,
      };
    case userActions.CREATE_USER_FAILURE:
    case userActions.UPDATE_USER_FAILURE:
    case userActions.DELETE_USER_FAILURE:
    case userActions.GET_USERS_LIST_FAILURE:
    case userActions.GET_SPECIFIC_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
