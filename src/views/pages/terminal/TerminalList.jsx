import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableTerminals from "components/table/DataTableTerminals";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import TerminalActions from "redux/terminal/action";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import { deleteTerminals } from "redux/terminal/service";
const { startLoader, endLoader } = loaderActions;
const { fetchTerminalsPagination } = TerminalActions;

const TerminalsList = (props) => {
  const {
    fetchTerminalsPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [terminalsData, setTerminalsData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const useTerminalPermission = useRolePermissions("TERMINAL");

  const handleChangePage = (event) => {
    fetchTerminalsPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchTerminalsPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchTerminalsByValues();
  }, []);

  const fetchTerminalsByValues = () => {
    fetchTerminalsPagination(25, 1);
  };

  const deleteTerminal = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    startLoader(true);
    deleteTerminals(id)
      .then((res) => {
        fetchTerminalsByValues();
      })
      .catch((err) => {
        endLoader(false);
        console.log(err, "error in terminal table");
      });
  };

  useMemo(() => {
    setTerminalsData(props.terminals);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.terminals, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Terminal ID",
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
              Terminal List123{" "}
              <span className="pull-right">
                {useTerminalPermission && (
                  <button
                    className="c-btn ma-5 add-new-btn-color"
                    onClick={() => props.history.push("/terminal/new")}
                  >
                    <i className="fas fa-plus" /> New Terminal
                  </button>
                )}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableTerminals
              columns={columns}
              data={terminalsData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              deleteTerminal={deleteTerminal}
            ></DataTableTerminals>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    terminals: state.terminal.terminals,
    pageLimit: state.terminal.pageLimit,
    pageNo: state.terminal.pageNo,
    total: state.terminal.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchTerminalsPagination,
  startLoader,
  endLoader,
})(TerminalsList);
