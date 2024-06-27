import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableDepartments from "components/table/DataTableDepartments";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import DepartmentActions from "redux/department/action";
const { startLoader, endLoader } = loaderActions;
const { fetchDepartmentsPagination } = DepartmentActions;

const DepartmentsList = (props) => {
  const {
    fetchDepartmentsPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [departmentsData, setDepartmentsData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleChangePage = (event) => {
    fetchDepartmentsPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchDepartmentsPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchDepartmentsByValues();
  }, []);

  const fetchDepartmentsByValues = () => {
    setTimeout(() => {
      fetchDepartmentsPagination(25, 1);
    }, 2000);
  };

  useMemo(() => {
    setDepartmentsData(props.departments);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.departments, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Dept. ID",
      id: "id",
      enableFilters: false,
    },
    {
      title: "Name",
      id: "name",
      enableFilters: true,
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
              Department List{" "}
              <span className="pull-right">
                {/* {useSupplierPermission && ( */}
                <button
                  className="c-btn ma-5 c-outline-info"
                  onClick={() => props.history.push("/department/new")}
                >
                  <i className="fas fa-plus" /> New Department
                </button>
                {/* )} */}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableDepartments
              columns={columns}
              data={departmentsData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            ></DataTableDepartments>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    departments: state.department.departments,
    pageLimit: state.department.pageLimit,
    pageNo: state.department.pageNo,
    total: state.department.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchDepartmentsPagination,
  startLoader,
  endLoader,
})(DepartmentsList);
