import departmentActions from "./actions";

const initialState = {
  departments: [],
  specificDepartment: null,
  loading: false,
  error: null,
};

export default function departmentReducer(state = initialState, action) {
  switch (action.type) {
    case departmentActions.CREATE_DEPARTMENT_REQUEST:
    case departmentActions.UPDATE_DEPARTMENT_REQUEST:
    case departmentActions.DELETE_DEPARTMENT_REQUEST:
    case departmentActions.GET_DEPARTMENTS_LIST_REQUEST:
    case departmentActions.GET_SPECIFIC_DEPARTMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case departmentActions.CREATE_DEPARTMENT_SUCCESS:
    case departmentActions.UPDATE_DEPARTMENT_SUCCESS:
    case departmentActions.DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case departmentActions.GET_DEPARTMENTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        departments: action.payload,
        error: null,
      };
    case departmentActions.GET_SPECIFIC_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        specificDepartment: action.payload,
        error: null,
      };
    case departmentActions.CREATE_DEPARTMENT_FAILURE:
    case departmentActions.UPDATE_DEPARTMENT_FAILURE:
    case departmentActions.DELETE_DEPARTMENT_FAILURE:
    case departmentActions.GET_DEPARTMENTS_LIST_FAILURE:
    case departmentActions.GET_SPECIFIC_DEPARTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
