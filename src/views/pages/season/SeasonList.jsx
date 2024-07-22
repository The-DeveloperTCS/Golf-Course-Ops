import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableSeasons from "components/table/DataTableSeasons";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import seasonActions from "redux/season/action";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import { deleteSeasons } from "redux/season/service";
const { startLoader, endLoader } = loaderActions;
const { fetchSeasonsPagination } = seasonActions;

const SeasonsList = (props) => {
  const {
    fetchSeasonsPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [seasonsData, setSeasonsData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const useSeasonPermission = useRolePermissions("");

  const handleChangePage = (event) => {
    fetchSeasonsPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchSeasonsPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchSeasonsByValues();
  }, []);

  const fetchSeasonsByValues = () => {
    setTimeout(() => {
      fetchSeasonsPagination(25, 1);
    }, 2000);
  };

  const deleteSeason = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    startLoader(true);
    deleteSeasons(id)
      .then((res) => {
        fetchSeasonsByValues();
      })
      .catch((err) => {
        endLoader(false);
        console.log(err, "error in season table");
      });
  };

  useMemo(() => {
    setSeasonsData(props.seasons);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.seasons, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Season ID",
      id: "id",
      enableFilters: false,
    },
    {
      title: "Name",
      id: "name",
      enableFilters: true,
    },
    {
      title: "Start Date",
      id: "startDate",
      enableFilters: true,
    },
    {
      title: "End Date",
      id: "endDate",
      enableFilters: true,
    },
    {
      title: "Season List",
      id: "sesason_list",
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
              Season List{" "}
              <span className="pull-right">
                {/* {useSeasonPermission && ( */}
                <button
                  className="c-btn ma-5 add-new-btn-color"
                  onClick={() => props.history.push("/season/new")}
                >
                  <i className="fas fa-plus" /> New Season
                </button>
                {/* )} */}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableSeasons
              columns={columns}
              data={seasonsData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              deleteSeason={deleteSeason}
            ></DataTableSeasons>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    seasons: state.seasons.seasons,
    pageLimit: state.seasons.pageLimit,
    pageNo: state.seasons.pageNo,
    total: state.seasons.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchSeasonsPagination,
  startLoader,
  endLoader,
})(SeasonsList);
