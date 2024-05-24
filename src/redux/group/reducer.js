import { groupActions } from "./action";

const initialState = {
  loading: false,
  error: null,
  groups: [],
  specificGroup: null,
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupActions.CREATE_GROUP_REQUEST:
    case groupActions.UPDATE_GROUP_REQUEST:
    case groupActions.DELETE_GROUP_REQUEST:
    case groupActions.GET_GROUPS_LIST_REQUEST:
    case groupActions.GET_SPECIFIC_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case groupActions.CREATE_GROUP_SUCCESS:
    case groupActions.UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: [...state.groups, action.payload],
      };
    case groupActions.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: state.groups.filter((group) => group.id !== action.payload.id),
      };
    case groupActions.GET_GROUPS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: action.payload,
      };
    case groupActions.GET_SPECIFIC_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        specificGroup: action.payload,
      };
    case groupActions.CREATE_GROUP_FAILURE:
    case groupActions.UPDATE_GROUP_FAILURE:
    case groupActions.DELETE_GROUP_FAILURE:
    case groupActions.GET_GROUPS_LIST_FAILURE:
    case groupActions.GET_SPECIFIC_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default groupReducer;
