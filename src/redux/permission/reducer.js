import { permissionActions } from "./action";

const initialState = {
  permissions: [],
  specificPermission: null,
  loading: false,
  error: null,
};

const permissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case permissionActions.CREATE_PERMISSION_REQUEST:
    case permissionActions.UPDATE_PERMISSION_REQUEST:
    case permissionActions.DELETE_PERMISSION_REQUEST:
    case permissionActions.GET_PERMISSIONS_LIST_REQUEST:
    case permissionActions.GET_SPECIFIC_PERMISSION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case permissionActions.CREATE_PERMISSION_SUCCESS:
      return {
        ...state,
        permissions: [...state.permissions, action.payload],
        loading: false,
      };
    case permissionActions.UPDATE_PERMISSION_SUCCESS:
      return {
        ...state,
        permissions: state.permissions.map((permission) =>
          permission.id === action.payload.id ? action.payload : permission
        ),
        loading: false,
      };
    case permissionActions.DELETE_PERMISSION_SUCCESS:
      return {
        ...state,
        permissions: state.permissions.filter(
          (permission) => permission.id !== action.payload.id
        ),
        loading: false,
      };
    case permissionActions.GET_PERMISSIONS_LIST_SUCCESS:
      return {
        ...state,
        permissions: action.payload,
        loading: false,
      };
    case permissionActions.GET_SPECIFIC_PERMISSION_SUCCESS:
      return {
        ...state,
        specificPermission: action.payload,
        loading: false,
      };
    case permissionActions.CREATE_PERMISSION_FAILURE:
    case permissionActions.UPDATE_PERMISSION_FAILURE:
    case permissionActions.DELETE_PERMISSION_FAILURE:
    case permissionActions.GET_PERMISSIONS_LIST_FAILURE:
    case permissionActions.GET_SPECIFIC_PERMISSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default permissionReducer;
