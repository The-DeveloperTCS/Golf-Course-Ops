import { permissionByRoleActions } from "./action";

const initialState = {
  permissionsByRole: [],
  specificPermissionByRole: null,
  loading: false,
  error: null,
};

const permissionByRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case permissionByRoleActions.CREATE_PERMISSIONBYROLE_REQUEST:
    case permissionByRoleActions.UPDATE_PERMISSIONBYROLE_REQUEST:
    case permissionByRoleActions.DELETE_PERMISSIONBYROLE_REQUEST:
    case permissionByRoleActions.GET_PERMISSIONSBYROLE_LIST_REQUEST:
    case permissionByRoleActions.GET_SPECIFIC_PERMISSIONBYROLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case permissionByRoleActions.CREATE_PERMISSIONBYROLE_SUCCESS:
      return {
        ...state,
        permissionsByRole: [...state.permissionsByRole, action.payload],
        loading: false,
      };
    case permissionByRoleActions.UPDATE_PERMISSIONBYROLE_SUCCESS:
      return {
        ...state,
        permissionsByRole: state.permissionsByRole.map((permissionByRole) =>
          permissionByRole.id === action.payload.id
            ? action.payload
            : permissionByRole
        ),
        loading: false,
      };
    case permissionByRoleActions.DELETE_PERMISSIONBYROLE_SUCCESS:
      return {
        ...state,
        permissionsByRole: state.permissionsByRole.filter(
          (permissionByRole) => permissionByRole.id !== action.payload.id
        ),
        loading: false,
      };
    case permissionByRoleActions.GET_PERMISSIONSBYROLE_LIST_SUCCESS:
      return {
        ...state,
        permissionsByRole: action.payload,
        loading: false,
      };
    case permissionByRoleActions.GET_SPECIFIC_PERMISSIONBYROLE_SUCCESS:
      return {
        ...state,
        specificPermissionByRole: action.payload,
        loading: false,
      };
    case permissionByRoleActions.CREATE_PERMISSIONBYROLE_FAILURE:
    case permissionByRoleActions.UPDATE_PERMISSIONBYROLE_FAILURE:
    case permissionByRoleActions.DELETE_PERMISSIONBYROLE_FAILURE:
    case permissionByRoleActions.GET_PERMISSIONSBYROLE_LIST_FAILURE:
    case permissionByRoleActions.GET_SPECIFIC_PERMISSIONBYROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default permissionByRoleReducer;
