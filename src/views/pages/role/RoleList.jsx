import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableRoles from "components/table/DataTableRoles";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import RoleActions from "redux/role/action";
const { startLoader, endLoader } = loaderActions;
const { fetchRolesPagination } = RoleActions;

const RolesList = (props) => {
  const {
    fetchRolesPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [rolesData, setRolesData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleChangePage = (event) => {
    fetchRolesPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchRolesPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchRolesByValues();
  }, []);

  const fetchRolesByValues = () => {
    setTimeout(() => {
      fetchRolesPagination(25, 1);
    }, 2000);
  };

  useMemo(() => {
    setRolesData(props.roles);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.roles, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Role ID",
      id: "id",
      enableFilters: false,
    },
    {
      title: "Name",
      id: "name",
      enableFilters: true,
    },
    {
      title: "Based Role",
      id: "baseRole",
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
              Role List{" "}
              <span className="pull-right">
                {/* {useSupplierPermission && ( */}
                <button
                  className="c-btn ma-5 c-outline-info"
                  onClick={() => props.history.push("/role/new")}
                >
                  <i className="fas fa-plus" /> New Role
                </button>
                {/* )} */}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableRoles
              columns={columns}
              data={rolesData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            ></DataTableRoles>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    roles: state.role.roles,
    pageLimit: state.role.pageLimit,
    pageNo: state.role.pageNo,
    total: state.role.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchRolesPagination,
  startLoader,
  endLoader,
})(RolesList);
