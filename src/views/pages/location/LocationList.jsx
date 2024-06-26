import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableLocations from "components/table/DataTableLocations";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import LocationActions from "redux/location/action";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import { deleteLocations } from "redux/location/service";

const { startLoader, endLoader } = loaderActions;
const { fetchLocationsPagination } = LocationActions;

const LocationsList = (props) => {
  const {
    fetchLocationsPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [locationsData, setLocationsData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const useLocationPermission = useRolePermissions("LOCATION");

  const handleChangePage = (event) => {
    fetchLocationsPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchLocationsPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchLocationsByValues();
  }, []);

  const fetchLocationsByValues = () => {
    setTimeout(() => {
      fetchLocationsPagination(25, 1);
    }, 2000);
  };

  const deleteLocation = (id, e) => {
    startLoader(true);
    e.preventDefault();
    e.stopPropagation();
    deleteLocations(id)
      .then((res) => {
        fetchLocationsByValues();
      })
      .catch((err) => {
        endLoader(false);
        console.log(err, "error in emploayee table");
      });
  };

  useMemo(() => {
    setLocationsData(props.locations);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.locations, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Location ID",
      id: "id",
      enableFilters: false,
    },
    {
      title: "Name",
      id: "name",
      enableFilters: true,
    },
    {
      title: "Destination",
      id: "destination",
      enableFilters: false,
    },
    {
      title: "Weather",
      id: "weather",
      enableFilters: false,
    },
    {
      title: "Time",
      id: "time",
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
              Location List{" "}
              <span className="pull-right">
                {useLocationPermission && (
                  <button
                    className="c-btn ma-5 c-outline-info"
                    onClick={() => props.history.push("/location/new")}
                  >
                    <i className="fas fa-plus" /> New Location
                  </button>
                )}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableLocations
              columns={columns}
              data={locationsData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              deleteLocation={deleteLocation}
            ></DataTableLocations>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state, "state");
  return {
    locations: state.location.locations,
    pageLimit: state.location.pageLimit,
    pageNo: state.location.pageNo,
    total: state.location.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchLocationsPagination,
  startLoader,
  endLoader,
})(LocationsList);
