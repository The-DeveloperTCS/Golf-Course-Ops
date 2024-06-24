import employeeActions from "./action";

const initialState = {
  departments: [],
  specificDepartment: null,
  loading: false,
  error: null,
  total: null,
  pageLimit: null,
  pageNo: null,
};

export default function departmentReducer(state = initialState, action) {
  switch (action.type) {
    case employeeActions.DEPARTMENTS_FETCHED_PAGINATION:
      return {
        ...state,
        departments: [...action.departments],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };

    default:
      return state;
  }
}
