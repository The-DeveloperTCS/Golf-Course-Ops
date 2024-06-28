import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTablePermissions from "components/table/DataTablePermissions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import PermissionActions from "redux/permission/action";
const { startLoader, endLoader } = loaderActions;
const { fetchPermissionsPagination } = PermissionActions;

const PermissionsList = (props) => {
  const {
    fetchPermissionsPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [permissionsData, setPermissionsData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleChangePage = (event) => {
    fetchPermissionsPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchPermissionsPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchPermissionsByValues();
  }, []);

  const fetchPermissionsByValues = () => {
    setTimeout(() => {
      fetchPermissionsPagination(25, 1);
    }, 2000);
  };

  useMemo(() => {
    setPermissionsData(props.permissions);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.permissions, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Permission ID",
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
              Permission List{" "}
              <span className="pull-right">
                {/* {useSupplierPermission && ( */}
                <button
                  className="c-btn ma-5 add-new-btn-color"
                  onClick={() => props.history.push("/permission/new")}
                >
                  <i className="fas fa-plus" /> New Permission
                </button>
                {/* )} */}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTablePermissions
              columns={columns}
              data={permissionsData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            ></DataTablePermissions>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    permissions: state.permission.permissions,
    pageLimit: state.permission.pageLimit,
    pageNo: state.permission.pageNo,
    total: state.permission.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchPermissionsPagination,
  startLoader,
  endLoader,
})(PermissionsList);
