import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableWithPagination from "components/table/DataTablePagination";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import EmployeeActions from "redux/employee/action";
import { deleteEmployees } from "redux/employee/service";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
const { startLoader, endLoader } = loaderActions;
const { fetchEmployeesPagination } = EmployeeActions;

const EmployeesList = (props) => {
  const {
    fetchEmployeesPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [employeesData, setEmployeeData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const useEmployeePermission = useRolePermissions("EMPLOYEE");

  const handleChangePage = (event) => {
    startLoader(true);
    fetchEmployeesPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    startLoader(true);
    fetchEmployeesPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchEmployeesByValues();
  }, []);

  const fetchEmployeesByValues = () => {
    setTimeout(() => {
      fetchEmployeesPagination(3, 1);
    }, 2000);
  };

  const deleteEmployee = (id, e) => {
    startLoader(true);
    e.preventDefault();
    e.stopPropagation();
    deleteEmployees(id)
      .then((res) => {
        fetchEmployeesByValues();
      })
      .catch((err) => {
        endLoader(false);
        console.log(err, "error in emploayee table");
      });
  };

  useMemo(() => {
    setEmployeeData(props.employees);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.employees, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Employee ID",
      id: "id",
      enableFilters: false,
    },
    {
      title: "Joining Date",
      id: "date",
      enableFilters: false,
    },
    {
      title: "First Name",
      id: "fName",
      enableFilters: true,
    },
    {
      title: "Last Name",
      id: "lName",
      enableFilters: false,
    },
    {
      title: "Phone No.",
      id: "phoneNo",
      enableFilters: false,
    },
    {
      title: "Email",
      id: "email",
      enableFilters: false,
    },
    {
      title: "User Name",
      id: "username",
      enableFilters: false,
    },
    {
      title: "Terminal",
      id: "terminal",
      enableFilters: false,
    },
    {
      title: "Role",
      id: "role",
      enableFilters: false,
    },
    {
      title: "Status",
      id: "status",
      enableFilters: true,
    },
    {
      title: "Action",
      id: "action",
      enableFilters: false,
    },
  ]);

  return loader ? (
    <Loader />
  ) : (
    <div className="row ma-0">
      <div className="col-lg-12 ptb-15">
        <div className="roe-card-style">
          <div className="roe-card-header flex center">
            <div className="flex-1 mr-15 my-title ml-1">
              Employee List{" "}
              <span className="pull-right">
                {useEmployeePermission && (
                  <button
                    className="c-btn ma-5 add-new-btn-color"
                    onClick={() => props.history.push("/employee/new")}
                  >
                    <i className="fas fa-plus" /> New Employee
                  </button>
                )}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableWithPagination
              columns={columns}
              data={employeesData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              deleteEmployee={deleteEmployee}
            ></DataTableWithPagination>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: state.employee.employees,
    pageLimit: state.employee.pageLimit,
    pageNo: state.employee.pageNo,
    total: state.employee.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchEmployeesPagination,
  startLoader,
  endLoader,
})(EmployeesList);
