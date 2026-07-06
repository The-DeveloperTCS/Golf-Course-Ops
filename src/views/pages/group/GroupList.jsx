import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableGroups from "components/table/DataTableGroups";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import GroupActions from "redux/group/action";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import { deleteGroups } from "redux/group/service";
const { startLoader, endLoader } = loaderActions;
const { fetchGroupsPagination } = GroupActions;

const GroupssList = (props) => {
  const {
    fetchGroupsPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [groupsData, setGroupsData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const useGroupPermission = useRolePermissions("GROUP");

  const handleChangePage = (event) => {
    fetchGroupsPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchGroupsPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchGroupsByValues();
  }, []);

  const fetchGroupsByValues = () => {
    fetchGroupsPagination(25, 1);
  };

  const deleteGroup = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    startLoader(true);
    deleteGroups(id)
      .then((res) => {
        fetchGroupsByValues();
      })
      .catch((err) => {
        endLoader(false);
        console.log(err, "error in group table");
      });
  };

  useMemo(() => {
    setGroupsData(props.groups);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.groups, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Group ID",
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
              Group List{" "}
              <span className="pull-right">
                {useGroupPermission && (
                  <button
                    className="c-btn ma-5 add-new-btn-color"
                    onClick={() => props.history.push("/group/new")}
                  >
                    <i className="fas fa-plus" /> New Group
                  </button>
                )}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableGroups
              columns={columns}
              data={groupsData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              deleteGroup={deleteGroup}
            ></DataTableGroups>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    groups: state.group.groups,
    pageLimit: state.group.pageLimit,
    pageNo: state.group.pageNo,
    total: state.group.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchGroupsPagination,
  startLoader,
  endLoader,
})(GroupssList);
