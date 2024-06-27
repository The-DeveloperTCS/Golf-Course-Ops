import employeeActions from "./action";

const initialState = {
  employees: [],
  specificEmployee: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case employeeActions.EMPLOYEES_FETCHED_PAGINATION:
      return {
        ...state,
        employees: [...action.employees],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    // case employeeActions.CREATE_EMPLOYEE_REQUEST:
    // case employeeActions.UPDATE_EMPLOYEE_REQUEST:
    // case employeeActions.DELETE_EMPLOYEE_REQUEST:
    // case employeeActions.GET_EMPLOYEES_LIST_REQUEST:
    // case employeeActions.GET_SPECIFIC_EMPLOYEE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //   };

    // case employeeActions.CREATE_EMPLOYEE_SUCCESS:
    //   return {
    //     ...state,
    //     employees: [...state.employees, action.payload],
    //     loading: false,
    //     error: null,
    //   };

    // case employeeActions.UPDATE_EMPLOYEE_SUCCESS:
    //   return {
    //     ...state,
    //     employees: state.employees.map((emp) =>
    //       emp.id === action.payload.id ? action.payload : emp
    //     ),
    //     loading: false,
    //     error: null,
    //   };

    // case employeeActions.DELETE_EMPLOYEE_SUCCESS:
    //   return {
    //     ...state,
    //     employees: state.employees.filter(
    //       (emp) => emp.id !== action.payload.id
    //     ),
    //     loading: false,
    //     error: null,
    //   };

    // case employeeActions.GET_EMPLOYEES_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     employees: action.payload,
    //     loading: false,
    //     error: null,
    //   };

    // case employeeActions.GET_SPECIFIC_EMPLOYEE_SUCCESS:
    //   return {
    //     ...state,
    //     specificEmployee: action.payload,
    //     loading: false,
    //     error: null,
    //   };

    // case employeeActions.CREATE_EMPLOYEE_FAILURE:
    // case employeeActions.UPDATE_EMPLOYEE_FAILURE:
    // case employeeActions.DELETE_EMPLOYEE_FAILURE:
    // case employeeActions.GET_EMPLOYEES_LIST_FAILURE:
    // case employeeActions.GET_SPECIFIC_EMPLOYEE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error,
    //   };

    default:
      return state;
  }
}
